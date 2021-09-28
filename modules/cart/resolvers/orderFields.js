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
  }

}

export default Order;
