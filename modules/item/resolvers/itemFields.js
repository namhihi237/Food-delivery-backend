const Item = {
  // Item fields
  category: async (parent, args, context) => {
    if (!parent.categoryId) return null;
    return context.db.Categories.findOne({ where: { id: parent.categoryId } });
  },

  reviews: async (parent, args, context) => {
    if (!parent.id) return null;
    return context.db.Reviews.findAll({ where: { itemId: parent.id } });
  }
}

export default Item;