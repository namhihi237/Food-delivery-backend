const userQuery = {
  getMe: async (parent, args, context, info) => {
    // check if user is logged in
    if (!context.user) {
      throw new Error("You are not logged in!");
    }

    // get user
    return context.db.Users.findOne({ where: { id: context.user.id } });
  }
};

export default userQuery;