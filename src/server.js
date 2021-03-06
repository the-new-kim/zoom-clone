import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

const PORT = 4000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);

const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("room_enter", (roomName, callback) => {
    console.log(roomName);
    setTimeout(() => {
      callback("hello! i am back!");
    }, 3000);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀Listening on http://localhost:${PORT} 🚀`);
});
