import http from "http";
import { WebSocket } from "ws";
import express from "express";

const app = express();

const PORT = 4000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser✅");
  socket.on("close", () => {
    console.log("Disconnected from the Browser❌");
  });
  ///////////////// this is for old version ws
  // socket.on("message", (message) => {
  //   console.log("Message from Browser: ", message);
  // });

  //////////////// for new version
  //https://github.com/websockets/ws/releases/tag/8.0.0
  socket.on("message", (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    console.log(message);
  });

  socket.send("hi");
});

server.listen(PORT, () => {
  console.log(`🚀Listening on http://localhost:${PORT} 🚀`);
});
