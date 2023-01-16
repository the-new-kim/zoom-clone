const socket = io();

const enterRoom = document.getElementById("enterRoom");
const enterRoomForm = enterRoom.querySelector("form");

const backendDone = (msg) => {
  console.log("Backend Says: ", msg);
};

handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = enterRoomForm.querySelector("input");

  // socket.emit("event_name", {payload}, functionToBackend)
  socket.emit("enter_room", { payload: input.value }, backendDone);
  input.value = "";
};

enterRoomForm.addEventListener("submit", handleRoomSubmit);
