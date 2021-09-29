import { OrderEnum } from '../enum';

const cartQuery = {
  getCartItems: async (parent, args, context, info) => {
    global.logger.info('cartQuery::getCartItems' + JSON.stringify(args));

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

    return cartItems;
  },

  listOrders: async (parent, args, context, info) => {
    global.logger.info('cartQuery::listOrders' + JSON.stringify(args));

    const { skip = 0, limit = 10, filter, orderBy } = args;

    // check token header
    if (!context.user) {
      throw new Error('Token is invalid');
    }
    let options = { where: {}, include: [], limit, offset: skip };

    if (filter) {
      if (filter.status === 'PAST') {
        options.where.status = {
          [context.db.Sequelize.Op.eq]: OrderEnum.COMPLETED
        }
      } else if (filter.status === 'CURRENT') {
        options.where.status = {
          [context.db.Sequelize.Op.ne]: OrderEnum.COMPLETED
        }
      }
    }

    if (orderBy) {
      let keys = Object.keys(orderBy);
      keys.forEach(key => {
        options.order.push([key, orderBy[key]]);
      });
    }

    global.logger.info('cartQuery::listOrders::options' + JSON.stringify(options));

    let orders = await context.db.Orders.findAll(options);
    orders = JSON.parse(JSON.stringify(orders));

    const total = await context.db.Orders.count(options);

    orders = JSON.parse(JSON.stringify(orders));

    return { total, orders };
  },

  detailOrder: async (parent, args, context, info) => {
    global.logger.info('cartQuery::detailOrder' + JSON.stringify(args));

    const { id } = args;

    // check token header
    if (!context.user) {
      throw new Error('Token is invalid');
    }

    let order = await context.db.Orders.findOne({
      where: { id },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order = JSON.parse(JSON.stringify(order));

    return order;
  }
}

export default cartQuery;