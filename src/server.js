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

function handleConnection(socket) {
  console.log(socket);
}

wss.on("connection", handleConnection);

server.listen(PORT, () => {
  console.log(`🚀Listening on http://localhost:${PORT} 🚀`);
});
