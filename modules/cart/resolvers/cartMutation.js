const cartMutation = {
  addToCart: async (parent, args, context, info) => {
    global.logger.info('cartMutation::addToCart' + JSON.stringify(args));

    // check if user is logged in
    if (!context.user) {
      throw new Error('Token is invalid');
    }

    // check if item is exist
    const item = await context.db.Items.findOne({ where: { id: args.itemId } });
    if (!item) {
      throw new Error('Item is not found');
    }

    // check item has been added to cart then update quantity
    let cartItem = await context.db.CartItems.findOne({
      where: {
        UserId: context.user.id,
        itemId: args.itemId,
      }
    });

    if (cartItem) {
      cartItem.quantity = args.quantity;
      cartItem.save();
    } else {
      // add item to cart
      cartItem = await context.db.CartItems.create({
        UserId: context.user.id,
        itemId: args.itemId,
        quantity: args.quantity
      });
    }

    cartItem = JSON.parse(JSON.stringify(cartItem));

    return cartItem;

  },


  deleteCartItem: async (parent, args, context, info) => {
    global.logger.info('cartMutation::deleteCartItem' + JSON.stringify(args));

    // check if user is logged in
    if (!context.user) {
      throw new Error('Token is invalid');
    }

    // check if cart exists
    const cart = await context.db.CartItems.findOne({ where: { id: args.id } });
    if (!cart) {
      throw new Error('Cart item not found');
    }

    // check if cart belongs to user
    if (cart.UserId !== context.user.id) {
      throw new Error('Cart item does not belong to user');
    }

    // delete cart item
    await context.db.CartItems.destroy({ where: { id: args.id } });

    return true;
  },

  checkout: async (parent, args, context, info) => {
    global.logger.info('cartMutation::checkout' + JSON.stringify(args));

    const { method } = args
    let transaction;
    try {
      // check if user is logged in
      if (!context.user) {
        throw new Error('Token is invalid');
      }

      const user = await context.db.Users.findOne({ where: { id: context.user.id } });

      // find all items in cart
      let cartItems = await context.db.CartItems.findAll({
        where: { UserId: context.user.id },
        include: [{
          model: context.db.Items,
          as: 'items',
          attributes: ['id', 'name', 'price',]
        }]
      });

      if (!cartItems || cartItems.length === 0) {
        throw new Error('No items in your cart');
      }

      cartItems = JSON.parse(JSON.stringify(cartItems));
      cartItems = cartItems.filter(item => item.items !== null)

      // find voucher
      let voucher = null;
      if (args.voucherCode) {
        voucher = await context.db.Vouchers.findOne({ where: { voucherCode: args.voucherCode, UserId: context.user.id } });
        if (!voucher) {
          throw new Error('Voucher not found');
        }

        voucher = JSON.parse(JSON.stringify(voucher));
        global.logger.info('cartMutation::checkout::voucher' + JSON.stringify(voucher));
      }


      // calculate total price
      const subTotal = cartItems.reduce((acc, item) => {
        return acc + item.quantity * item.items.price;
      }, 0);

      // calculate shipping
      // @ --- need to implement function calculate shipping here --- @
      const shipping = 0;

      // calculate total after discount
      let total = subTotal;
      let discount = 0;

      if (voucher) {
        // check expired date voucher
        if (voucher.expiredDate && voucher.expiredDate < new Date()) {
          throw new Error('Voucher is expired');
        }

        switch (voucher.type) {
          case 'percentage':
            discount = subTotal * voucher.discount / 100;
            discount = discount > voucher.maxDiscount ? voucher.maxDiscount : discount;
            global.logger.info('cartMutation::checkout::voucher::percentage' + JSON.stringify(discount))
            break;
          case 'fixed':
            if (subTotal < voucher.minTotal) {
              throw new Error(`Total price all items must be greet than ${voucher.minTotal}`);
            }
            discount = voucher.discount;
            global.logger.info('cartMutation::checkout::voucher::fixed' + JSON.stringify(discount))
            break;
        }

        total = total - discount;
      }

      // calculate grand total
      const grandTotal = total + shipping;

      transaction = await context.db.sequelize.transaction();

      // create order
      let order;
      if (method === 'COD') {
        order = await context.db.Orders.create({
          UserId: context.user.id,
          status: 'new',
          subTotal,
          shipping,
          total,
          grandTotal,
          voucherCode: voucher ? voucher.voucherCode : null,
          voucherDiscount: voucher ? voucher.discount : null,
          discount,
          note: args.note,
          phoneNumber: user.phoneNumber,
          address: user.address,
          name: user.fullName,
        }, { transaction });

        // create transaction
        await context.db.Transactions.create({
          OrderId: order.id,
          status: 'NEW',
          methodPayment: 'COD',
          content: '',
        });

        // create order items
        cartItems.forEach(async (cartItem) => {
          await context.db.OrderItems.create({
            OrderId: order.id,
            ItemId: cartItem.itemId,
            UserId: context.user.id,
            quantity: cartItem.quantity,
            price: cartItem.items.price,
          });
        }, { transaction });


      } else if (method === 'MOMO') {
        // Not implemented
      }

      // delete cart item
      await context.db.CartItems.destroy({ where: { UserId: context.user.id }, transaction });

      // delete voucher
      await context.db.Vouchers.destroy({ where: { id: voucher.id }, transaction });

      transaction.commit();

      return order;
    } catch (error) {
      if (transaction) transaction.rollback();
      throw error;
    }

  }
}

export default cartMutation;