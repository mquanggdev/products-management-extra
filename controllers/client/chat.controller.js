const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const streamUpload = require("../../helper/streamUpload.helper");
//GET /chat 
module.exports.index = async (req,res) => {
  const userId = res.locals.user.id ;
  const fullname = res.locals.user.fullName
    _io.once("connection" , (socket) => {
      socket.on("CLIENT_SEND_MESSAGE" ,async (data) => {
          const chatData = {
            userId : userId,
            content:data.content,
          }
          const linkImages = [] ;
          for (const image of data.images) {
            const result = await streamUpload(image);
            linkImages.push(result.url);
          }

          chatData.images = linkImages;
          
           
          // lưu data vào database
          const chat = new Chat(chatData) ;
          await chat.save();


          // Trả tin nhắn realtime về cho mn
        _io.emit("SERVER_RETURN_MESSAGE",{
          userId:userId,
          fullname:fullname,
          content:data.content,
          images:linkImages
        })
        // end Trả tin nhắn realtime về cho mn
      })

      //CLIENT_SEND_TYPING
      socket.on("CLIENT_SEND_TYPING" , (type) => {
        socket.broadcast.emit("SERVER_RETURN_TYPING" , {
          userId:userId,
          fullname:fullname,
          type:type
        })
      })
      // END CLIENT_SEND_TYPING
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