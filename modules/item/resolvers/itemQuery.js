const itemQuery = {
  getItems: async (parent, args, context, info) => {

    const { skip = 0, limit = 10, filter, orderBy } = args;

    global.logger.info('itemQuery.getItems' + JSON.stringify(args));

    const options = { where: {}, skip, limit, order: [] }

    if (filter) {
      options.where = filter;
    }

    if (orderBy) {
      let keys = Object.keys(orderBy);
      keys.forEach(key => {
        options.order.push([key, orderBy[key]]);
      });
    }

    global.logger.info('itemQuery.getItems options' + JSON.stringify(options));

    let items = await context.db.Items.findAll(options);

    items = JSON.parse(JSON.stringify(items));

    const total = await context.db.Items.count(options);

    return { total, items };
  },

  getItem: async (parent, args, context, info) => {
    global.logger.info('authenticationMutation::getItem' + JSON.stringify(args));

    return context.db.Items.findOne({
      where: { id: args.id }
    });
  },

  getCartItems: async (parent, args, context, info) => {
    global.logger.info('authenticationMutation::getCartItems' + JSON.stringify(args));

    // check token header
    if (!context.user) {
      throw new Error('Token is invalid');
    }
    console.log('context.user', context.user);

    let cartItems = await context.db.CartItems.findAll({
      where: { UserId: context.user.id },
      include: {
        model: context.db.Items,
        as: 'items'
      }
    });

    cartItems = JSON.parse(JSON.stringify(cartItems));

    cartItems = cartItems.map(cartItem => {
      cartItem.item = JSON.parse(JSON.stringify(cartItem.items));
      delete cartItem.items;
      return cartItem;
    });

    return cartItems;
  }
}

export default itemQuery;