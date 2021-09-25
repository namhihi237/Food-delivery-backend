const Item = {
  // Item fields
  category: async (parent, args, context) => {
    if (!parent.categoryId) return null;
    return context.db.Categories.findOne({ where: { id: parent.categoryId } });
  }
}

export default Item;