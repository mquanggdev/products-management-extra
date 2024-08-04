const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
//GET /chat 
module.exports.index = async (req,res) => {
  const userId = res.locals.user.id ;
    _io.once("connection" , (socket) => {
      socket.on("CLIENT_SEND_MESSAGE" ,async (data) => {
        console.log(data); 
          const chatData = {
            userId : userId,
            content:data.content
          }       
          // lưu data vào database
          const chat = new Chat(chatData) ;
          await chat.save();
      })

      // Trả tin nhắn realtime về cho mn
    });

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