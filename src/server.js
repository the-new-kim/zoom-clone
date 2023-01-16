import express from "express";
import http from "http";
import WebSocket from "ws";

const PORT = process.env.PORT || 4000;

const app = express();

// app.set("views", __dirname + "/views");
const handleListening = () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
};

app.set("view engine", "pug");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("SOCKETS:", sockets.length);
  console.log("Connected to Browser");

  socket.on("message", (data) => {
    const message = JSON.parse(data);
    console.log("MSG FROM BRSR: ", message);
    console.log("SOCKET NICKNAME", socket["nickname"]);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname":
        socket.nickname = message.payload;
    }
  });
});

server.listen(PORT, handleListening);
