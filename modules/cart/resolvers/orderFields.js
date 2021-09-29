import moment from "moment";

const Order = {
  // Item fields

  createdAt: (parent, args, context) => {
    if (!parent.createdAt) return null;
    return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss');
  },

  deliveryTime: (parent, args, context, info) => {
    if (!parent.deliveryTime) return null;
    console.log(parent.createdAt);

    return moment(parent.deliveryTime).format('YYYY-MM-DD HH:mm:ss');
  },

  items: async (parent, args, context, info) => {
    let items = await context.db.OrderItems.findAll({
      include: [
        {
          model: context.db.Items,
          as: "items",
        }
      ],
      where: {
        orderId: parent.id,
      }
    });
    items = JSON.parse(JSON.stringify(items));

    items = items.map(item => {

      let newItem = {
        ...item,
        name: item.items.name,
        image: item.items.image,
      }
      delete newItem.items;
      return newItem;
    });

    return items;
  }

}

export default Order;
