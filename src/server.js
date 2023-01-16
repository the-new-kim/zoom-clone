import express from "express";
import http from "http";
import SocketIO from "socket.io";

const PORT = process.env.PORT || 4000;

const app = express();

// app.set("views", __dirname + "/views");
const handleListening = () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
};

app.set("view engine", "pug");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  // socket.on("event_name_from_front", (payload, functionFromFront)=> {...})
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done("Server is Done😎");
    }, 3000);
  });
});

httpServer.listen(PORT, handleListening);
