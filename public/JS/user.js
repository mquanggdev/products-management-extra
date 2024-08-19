// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click" , () => {
            // Thêm class add cho box-user
            button.closest(".box-user").classList.add("add");

            // gửi data của ông được gửi lên sever
            const userIdB = button.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND",userIdB);
        })
    })
}
// end chức năng gửi yêu cầu

// Chức năng hủy gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click" , () => {
            // Xóa class add cho box-user
            button.closest(".box-user").classList.remove("add");

            // gửi data của ông được gửi lên sever
            const userIdB = button.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_CANCEL_FRIEND",userIdB);
        })
    })
}
// end chức năng hủy gửi yêu cầu


// Chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click" , () => {
            // thêm class refuse cho box-user
            button.closest(".box-user").classList.add("refuse");

            // gửi data của ông được gửi lên sever
            const userIdB = button.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND",userIdB);
        })
    })
}
// end Chức năng từ chối kết bạn


// Chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click" , () => {
            // thêm class accepted cho box-user
            button.closest(".box-user").classList.add("accepted");

            // gửi data của ông được gửi lên sever
            const userIdB = button.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND",userIdB);
        })
    })
}
// end Chức năng chấp nhận kết bạn


// server return length accept friend
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND" , (data) => {
    const bageUsersAccept = document.querySelector(`[badge-users-accept="${data.userId}"]`);
    if (bageUsersAccept) {
        bageUsersAccept.innerHTML = data.length;
    }
})
// end server return length accept friend