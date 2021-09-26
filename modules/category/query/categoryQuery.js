const categoryQuery = {
  getCategories: async (parent, args, context, info) => {
    return context.db.Categories.findAll({});
  }
}

export default categoryQuery;