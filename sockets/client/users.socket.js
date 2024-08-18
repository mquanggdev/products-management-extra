const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports = async (req,res) => {
    const userIdA= res.locals.user.id ;
    _io.once("connection" , (socket) => {
        //Client_add_friend
        socket.on("CLIENT_ADD_FRIEND" , async (userIdB) => {
            // thêm id của thằng gửi đến acceptFriends của thằng đc gửi
            const existUserIdB = await User.findOne({
                _id : userIdB , 
                acceptFriends : userIdA
            })

            if (!existUserIdB) {
                await User.updateOne({
                    _id : userIdB
                } , {
                    $push : {
                        acceptFriends : userIdA
                    }
                })
            }
            // thêm id của thằng được gửi và requestFriend của thằng gửi
            const existUserIdA = await User.findOne({
                _id : userIdA , 
                requestFriends : userIdB
            })

            if (!existUserIdA) {
                await User.updateOne({
                    _id : userIdA
                } , {
                    $push : {
                        requestFriends : userIdB
                    }
                })
            }
        })   
        // end client_add_friend
    });
}