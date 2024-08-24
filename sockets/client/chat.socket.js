const Chat = require("../../models/chat.model");
const streamUpload = require("../../helper/streamUpload.helper");


module.exports = (req,res) => {
    const userId = res.locals.user.id ;
    const fullname = res.locals.user.fullName;
    const roomChatId = req.params.roomChatId ;

    _io.once("connection" , (socket) => {
      socket.join(roomChatId);

        socket.on("CLIENT_SEND_MESSAGE" ,async (data) => {
            const chatData = {
              userId : userId,
              content:data.content,
              roomChatId : roomChatId
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
          _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE",{
            userId:userId,
            fullname:fullname,
            content:data.content,
            images:linkImages
          })
          // end Trả tin nhắn realtime về cho mn
        })
  
        //CLIENT_SEND_TYPING
        socket.on("CLIENT_SEND_TYPING" , (type) => {
          socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING" , {
            userId:userId,
            fullname:fullname,
            type:type
          })
        })
        // END CLIENT_SEND_TYPING
      });
}