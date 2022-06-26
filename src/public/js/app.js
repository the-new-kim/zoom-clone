const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from the Server❌");
});

socket.addEventListener("message", (message) => {
  console.log("Message from server: ", message.data);
});

setTimeout(() => {
  socket.send("hi from browser.");
}, 3000);
