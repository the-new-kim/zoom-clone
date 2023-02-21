const socket = io();

console.log(socket);

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

const room = document.getElementById("room");
const nicknameForm = welcome.querySelector("#nickname");
const nicknameInput = nicknameForm.querySelector("input");
const roomsDiv = welcome.querySelector("#rooms");

let roomName;
room.hidden = true;

function paintRoomCount(newCount) {
  const h3 = room.querySelector("h3");
  h3.innerText = `${roomName}(${newCount})`;
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom(newCount) {
  welcome.hidden = true;
  room.hidden = false;

  newCount && paintRoomCount(newCount);

  const messageForm = room.querySelector("#msg");
  messageForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");

  // socket.emit("event_name", {payload}, functionToBackend)
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () =>
    addMessage(`You: ${value}`)
  );
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const value = nicknameInput.value;
  socket.emit("nickname", value);
}

welcomeForm.addEventListener("submit", handleRoomSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit);

socket.addEventListener("welcome", (user, newCount) => {
  paintRoomCount(newCount);
  addMessage(`${user} joined!`);
});

socket.addEventListener("bye", (user, newCount) => {
  paintRoomCount(newCount);

  addMessage(`${user} left...`);
});

socket.addEventListener("new_message", addMessage);
socket.addEventListener("init_nickname", (nickname) => {
  nicknameInput.value = nickname;
});

socket.addEventListener("room_change", (rooms) => {
  console.log(rooms);
  const ul = roomsDiv.querySelector("ul");
  ul.innerHTML = "";
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    ul.appendChild(li);
  });
});
