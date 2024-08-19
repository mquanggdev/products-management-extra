const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports = (req,res) => {
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

            // trả về cho ông được nhận lời mời độ dài của mục acceptFriends
            const infoB = await User.findOne({
                _id : userIdB
            });
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND" , {
                length : infoB.acceptFriends.length ,
                userId : userIdB
            })
        })   
        // end client_add_friend


         //Client_cancel_friend
         socket.on("CLIENT_CANCEL_FRIEND" , async (userIdB) => {
            // Xóa id của thằng gửi đến acceptFriends của thằng đc gửi
            const existUserIdB = await User.findOne({
                _id : userIdB , 
                acceptFriends : userIdA
            })

            if (existUserIdB) {
                await User.updateOne({
                    _id : userIdB
                } , {
                    $pull : {
                        acceptFriends : userIdA
                    }
                })
            }
            // Xóa id của thằng được gửi và requestFriend của thằng gửi
            const existUserIdA = await User.findOne({
                _id : userIdA , 
                requestFriends : userIdB
            })

            if (existUserIdA) {
                await User.updateOne({
                    _id : userIdA
                } , {
                    $pull : {
                        requestFriends : userIdB
                    }
                })
            }

            // trả về cho ông được nhận lời mời độ dài của mục acceptFriends
            const infoB = await User.findOne({
                _id : userIdB
            });
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND" , {
                length : infoB.acceptFriends.length ,
                userId : userIdB
            })
        })   
        // end Client_cancel_friend


        //Client_refuse_friend
        socket.on("CLIENT_REFUSE_FRIEND" , async (userIdB) => {
            // Xóa id của thằng gửi đến acceptFriends của thằng đc gửi
            const existUserIdB = await User.findOne({
                _id : userIdA , 
                acceptFriends : userIdB
            })

            if (existUserIdB) {
                await User.updateOne({
                    _id : userIdA
                } , {
                    $pull : {
                        acceptFriends : userIdB
                    }
                })
            }
            // Xóa id của thằng được gửi và requestFriend của thằng gửi
            const existUserIdA = await User.findOne({
                _id : userIdB , 
                requestFriends : userIdA
            })

            if (existUserIdA) {
                await User.updateOne({
                    _id : userIdB
                } , {
                    $pull : {
                        requestFriends : userIdA
                    }
                })
            }
        })   
        // end Client_cancel_friend



        //Client_accept_friend
        socket.on("CLIENT_ACCEPT_FRIEND" , async (userIdB) => {
            // Thêm userId và roomChatId của thằng gửi vào FriendList của thằng được nhận
            // Xóa id của thằng gửi đến acceptFriends của thằng đc gửi
            const existUserIdB = await User.findOne({
                _id : userIdA , 
                acceptFriends : userIdB
            })

            if (existUserIdB) {
                await User.updateOne({
                    _id : userIdA
                } ,{
                    $push: {
                        friendsList: {
                            userId : userIdB ,
                            roomChatId: ""
                        }
                    },
                    $pull : {
                        acceptFriends : userIdB
                    }
                }
                    
                )
            }
            // Thêm userId và roomChatId của thằng được gửi vào FriendList của thằng gửi
            // Xóa id của thằng được gửi và requestFriend của thằng gửi
            const existUserIdA = await User.findOne({
                _id : userIdB , 
                requestFriends : userIdA
            })

            if (existUserIdA) {
                await User.updateOne({
                    _id : userIdB
                } , {
                    $push: {
                        friendsList: {
                            userId : userIdA ,
                            roomChatId: ""
                        }
                    }, $pull : {
                        requestFriends : userIdA
                    }
                }
                )
            }
        })   
        // end Client_accept_friend
    });
}