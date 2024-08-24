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
  const friendsList = res.locals.user.friendsList;
  const friendsListId = friendsList.map(item => item.userId) ;

  const usersChat = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
      { _id: { $nin: friendsListId } },
    ],
    status: "active",
    deleted: false
  }).select("id avatar fullName");

  res.render("client/pages/userChat/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: usersChat
  });
};


// [GET] /users/request
module.exports.request = async (req, res) => {
    //socket
  userSocket(req,res) ;
  //end socket
  const requestFriends = res.locals.user.requestFriends;
  const usersChat = await User.find({
    _id: { $in: requestFriends },
    status: "active",
    deleted: false
  }).select("id avatar fullName");

  res.render("client/pages/userChat/request", {
    pageTitle: "Lời mời đã gửi",
    users: usersChat
  });
};

// [GET] /users/accept
module.exports.accept = async (req, res) => {
  //socket
userSocket(req,res) ;
//end socket
const acceptFriends = res.locals.user.acceptFriends;

const usersChat = await User.find({
  _id: { $in: acceptFriends },
  status: "active",
  deleted: false
}).select("id avatar fullName");

res.render("client/pages/userChat/accept", {
  pageTitle: "Lời mời đã nhận",
  users: usersChat
});
}

// [GET] /users/friends
module.exports.friends = async (req, res) => {
  //socket
userSocket(req,res) ;
//end socket

const friendsList = res.locals.user.friendsList;
const friendsListId = friendsList.map(item => item.userId);

const users = await User.find({
  _id: { $in: friendsListId },
  status: "active",
  deleted: false
}).select("id avatar fullName statusOnline");
users.forEach(user => {
  const infoUser = friendsList.find(friend => friend.userId == user.id)
  user.roomChatId = infoUser.roomChatId;
})

res.render("client/pages/userChat/friends", {
  pageTitle: "Danh sách bạn bè",
  users: users
});
}