import moment from "moment";

const Review = {
  // Item fields
  user: async (parent, args, context) => {
    if (!parent.UserId) return null;
    return context.db.Users.findOne({
      where: { id: parent.UserId },
      attributes: ["id", "fullName", "image"]
    });
  },

  createdAt: (parent, args, context) => {
    if (!parent.createdAt) return null;
    return moment(parent.createdAt).format('YYYY-MM-DD HH:mm:ss');
  }

}

export default Review;