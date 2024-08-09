const User = require("../../models/user.model");

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  const userId = res.locals.user.id;

  // $ne: not equal
  const usersChat = await User.find({
    _id: { $ne: userId },
    status: "active",
    deleted: false
  }).select("id avatar fullName");

  res.render("client/pages/userChat/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: usersChat
  });
};