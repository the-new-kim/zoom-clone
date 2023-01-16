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

// app.listen(PORT, handleListening);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  socket.send("hello");
});

server.listen(PORT, handleListening);
