const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(message) {
  console.log("message from backend: ", message);
}

function handleWelcomeSubmit(event) {
  event.preventDefault();

  const input = form.querySelector("input");

  socket.emit("room_enter", { payload: input.value }, backendDone);

  input.value = "";
}

form.addEventListener("submit", handleWelcomeSubmit);
