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

    let items = await context.db.Items.findAll({
      ...options,
      order: [['id', 'ASC']]
    });

    items = JSON.parse(JSON.stringify(items));

    const total = await context.db.Items.count(options);

    return { total, items };

  }
}

export default itemQuery;