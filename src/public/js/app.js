console.log("Hello from public folddfdser!");
const socket = new WebSocket(`ws://${window.location.host}`);

console.log(socket);

socket.addEventListener("open", () => console.log("Connected to Server"));
socket.addEventListener("message", (message) =>
  console.log("MESSAGE: ", message)
);

socket.addEventListener("close", () => console.log("Disconnected from server"));
