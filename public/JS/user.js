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

// server return info accept friend
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND" , (data) => {
    const dataUsersAccept = document.querySelector(`[data-users-accept="${data.userIdB}"]`) ;
    if(dataUsersAccept) {
        const boxUserA = document.createElement("div") ;
        boxUserA.classList.add("col-6") ;
        boxUserA.setAttribute("user-id", data.infoA._id);
        boxUserA.innerHTML= `
      <div class="box-user">
        <div class="inner-avatar">
          <img src="https://robohash.org/hicveldicta.png" alt="${data.infoA.fullName}">
        </div>
        <div class="inner-info">
          <div class="inner-name">${data.infoA.fullName}</div>
          <div class="inner-buttons">
            <button 
              class="btn btn-sm btn-primary mr-1" 
              btn-accept-friend="${data.infoA._id}"
            >
              Chấp nhận
            </button>
            <button 
              class="btn btn-sm btn-secondary mr-1" 
              btn-refuse-friend="${data.infoA._id}"
            >
              Xóa
            </button>
            <button 
              class="btn btn-sm btn-secondary mr-1" 
              btn-deleted-friend="" disabled=""
            >
              Đã xóa
            </button>
            <button 
              class="btn btn-sm btn-primary mr-1" 
              btn-accepted-friend="" disabled=""
            >
              Đã chấp nhận
            </button>
          </div>
        </div>
      </div>
    `
    dataUsersAccept.appendChild(boxUserA);

    //Sau khi gửi xong thì bắt sự kiện cho nút từ chối ở bên người được nhận lời mời
    const btnRefuse = boxUserA.querySelector("[btn-refuse-friend]");
    if(btnRefuse) {
        btnRefuse.addEventListener("click" , () => {
            // thêm class refuse cho box-user
            btnRefuse.closest(".box-user").classList.add("refuse");

            // gửi data của ông được gửi lên sever
            const userIdA = btnRefuse.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND",userIdA);
        })
     }
     const buttonAccept = boxUserA.querySelector("[btn-accept-friend]");
    buttonAccept.addEventListener("click", () => {
      // Việc 1: Thêm class "accepted" cho box-user
      buttonAccept.closest(".box-user").classList.add("accepted");

      // Việc 2: Gửi lên server userIdA
      const userIdA = buttonAccept.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND", userIdA);
    })
    }
})
// end server info length accept friend



// SERVER_RETURN_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_ID_CANCEL_FRIEND" , (data) => {
const dataUsersAccept = document.querySelector(`[data-users-accept="${data.userIdB}"]`);
if(dataUsersAccept) {
    const boxUserA = dataUsersAccept.querySelector(`[user-id="${data.userIdA}"]`)
    if(boxUserA) {
        dataUsersAccept.removeChild(boxUserA);
      }
}
})
// End SERVER_RETURN_ID_CANCEL_FRIEND