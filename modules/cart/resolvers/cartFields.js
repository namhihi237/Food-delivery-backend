import moment from "moment";

const CartItem = {
  // Item fields
  item: async (parent, args, context) => {
    if (!parent.itemId) return null;
    return context.db.Items.findOne({ where: { id: parent.itemId } });
  },

  createdAt: (parent, args, context) => {
    if (!parent.createdAt) return null;
    return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss');
  },

}

export default CartItem;