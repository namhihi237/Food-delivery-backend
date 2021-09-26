const cartQuery = {
  getCartItems: async (parent, args, context, info) => {
    global.logger.info('authenticationMutation::getCartItems' + JSON.stringify(args));

    // check token header
    if (!context.user) {
      throw new Error('Token is invalid');
    }

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

export default cartQuery;