const User = require("../../models/user.model");
const userSocket = require("../../sockets/client/users.socket");
// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  const userId = res.locals.user.id;
//socket
userSocket(req,res) ;
//end socket
  // $ne: not equal
  // $nin : not in 
  const requestFriends = res.locals.user.requestFriends;
  const acceptFriends = res.locals.user.acceptFriends;

  const usersChat = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
    ],
    status: "active",
    deleted: false
  }).select("id avatar fullName");

  res.render("client/pages/userChat/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: usersChat
  });
};