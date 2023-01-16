const socket = new WebSocket(`ws://${window.location.host}`);

const messageForm = document.getElementById("messageForm");
const nicknameForm = document.getElementById("nicknameForm");
const messageUl = document.getElementById("messageUl");

const makeMessage = (type, payload) => {
  const message = { type, payload };
  return JSON.stringify(message);
};

const handleSubmitMessage = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
};

const handleSubmitNickname = (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
};

const handleOpen = () => console.log("Connected to Server");
const handleClose = () => console.log("Disconnected from server");
const handleMessage = (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageUl.append(li);
};

messageForm.addEventListener("submit", handleSubmitMessage);
nicknameForm.addEventListener("submit", handleSubmitNickname);

socket.addEventListener("open", handleOpen);
socket.addEventListener("message", handleMessage);
socket.addEventListener("close", handleClose);
