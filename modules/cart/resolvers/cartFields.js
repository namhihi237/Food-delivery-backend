const CartItem = {
  // Item fields
  item: async (parent, args, context) => {
    if (!parent.itemId) return null;
    return context.db.Items.findOne({ where: { id: parent.itemId } });
  },
}

export default CartItem;