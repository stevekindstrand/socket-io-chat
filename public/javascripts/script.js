const socket = io();

const user = document.getElementById("user");
const saveUserBtn = document.getElementById("saveUserBtn");
let username = "";

const room = document.getElementById("room");
const saveRoomBtn = document.getElementById("saveRoomBtn");
let chatroom = "";

const form = document.getElementById("form");
const input = document.getElementById("input");

const chatDiv = document.getElementById("chatDiv");
const userNameDiv = document.getElementById("userNameDiv");
const roomNumberDiv = document.getElementById("roomNumberDiv");

saveUserBtn.addEventListener("click", () => {
  username = user.value;
  userNameDiv.append("Username: ", username);
  saveUserBtn.disabled = true;
});

saveRoomBtn.addEventListener("click", () => {
  chatroom = room.value;
  roomNumberDiv.append("Chatroom: ", chatroom);
  saveRoomBtn.disabled = true;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (username && chatroom && input.value) {
    socket.emit("chat message", {
      user: username,
      room: chatroom,
      text: input.value,
    });
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const blue = `<p style="color: #0000ff;">`;
  const red = `<p style="color: #ff1100;">`;

  if (msg.room == chatroom) {
    if (msg.user == username) {
      chatDiv.insertAdjacentHTML(
        "beforeend",
        blue + msg.user + ": " + msg.text + `<br />`
      );
    } else {
      chatDiv.insertAdjacentHTML(
        "beforeend",
        red + msg.user + ": " + msg.text + `<br />`
      );
    }
  }
});
