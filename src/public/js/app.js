const socket = new WebSocket(`ws://${window.location.host}`);

const messageForm = document.querySelector("form");

socket.addEventListener("open", () => {
  console.log("Connected to Server✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from the Server❌");
});

socket.addEventListener("message", (message) => {
  console.log("Message from server: ", message.data);
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
