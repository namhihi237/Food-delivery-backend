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
  }
}

export default cartMutation;