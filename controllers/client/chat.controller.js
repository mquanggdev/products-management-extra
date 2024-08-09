const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const chatSocket = require("../../sockets/client/chat.socket");
//GET /chat 
module.exports.index = async (req,res) => {
  //socket
  chatSocket(req,res);
  //end socket
    const chats = await Chat.find({});
    for (const chat of chats) {
      const infoUser = await User.findOne({
        _id : chat.userId
      })

      chat.fullname = infoUser.fullName;
    } 
    
    res.render("client/pages/chat/index.pug",{
      pageTitle : "Chat",
      chats: chats
    });
  }