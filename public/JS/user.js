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