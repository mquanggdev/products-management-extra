import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

var socket = io();

//Typing
const inputChat = document.querySelector(".chat .inner-form input[name='content']");
var typingTimeOut;
if(inputChat){
  inputChat.addEventListener("keyup",() => {
    socket.emit("CLIENT_SEND_TYPING" , "show");

    clearTimeout(typingTimeOut);

    typingTimeOut = setTimeout(()=>{
      socket.emit("CLIENT_SEND_TYPING" , "hidden");
    },3000)
  })
} 
//end typing
//SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
socket.on("SERVER_RETURN_TYPING" , (data) => {
  if(data.type == "show"){
    const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if(!existTyping){
      const boxTyping = document.createElement("div");
      boxTyping.classList.add("box-typing");
      boxTyping.setAttribute("user-id",data.userId);
      boxTyping.innerHTML = `
        <div class="inner-name">${data.fullname}</div>
        <div class="inner-dots"><span></span><span></span><span></span></div>
      `;
      elementListTyping.appendChild(boxTyping); 
      const bodyChat = document.querySelector(".chat .inner-body");
      bodyChat.scrollTop = bodyChat.scrollHeight;
    }
  }else{
    const boxTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if(boxTyping){
      elementListTyping.removeChild(boxTyping);
    }
  }
})
//END SERVER_RETURN_TYPING

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector(".chat .inner-form");
if(formChat) {
  formChat.addEventListener("submit", (event) => {
    event.preventDefault();

    const content = event.target.content.value;
    if(content) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content
      });
      event.target.content.value = "";
      socket.emit("CLIENT_SEND_TYPING" , "hidden");
    }
  })
}
// end client_send_message

//Server_return_message
  socket.on("SERVER_RETURN_MESSAGE" , (data) => {
    const div = document.createElement("div");
    const myIdElement = document.querySelector("[my-id]");
    const myId = myIdElement.getAttribute("my-id");
    let htmFullName = "" ;
    if (myId == data.userId) {
      div.classList.add("inner-outgoing");
    }else{
      div.classList.add("inner-incoming");
      htmFullName=`<div class="inner-name">${data.fullname}</div>`
    }
    
    div.innerHTML = `
      ${htmFullName}
      <div class="inner-content">${data.content}</div>
    `

    const parentElement = document.querySelector(".chat .inner-body");
    parentElement.insertBefore(div,elementListTyping);
    bodyChat.scrollTop = bodyChat.scrollHeight; // nếu mà áp dụng cho người chat thôi thì cho lên trên phần client-send-message
  })
//end server_return_message

//Scroll to bottom
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat){
  bodyChat.scrollTop = bodyChat.scrollHeight;
} 
//end-scroll to bottom

// icon emoji
const emoji = document.querySelector('emoji-picker');
if(emoji){
  const inputChat = document.querySelector(".chat .inner-form input[name='content']");
  emoji.addEventListener('emoji-click', event => {
    const icon = event.detail.unicode ;
    inputChat.value = inputChat.value + icon ;
  });
}
//end icon emoji

// show popup icon
const buttonIcon = document.querySelector("[button-icon]");
if(buttonIcon){
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip)

  buttonIcon.addEventListener("click", () => {
    tooltip.classList.toggle('shown');
  });
}
// end show popup icon