import express from "express";
import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

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
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
  mode: "development",
});

function publicRooms() {
  const {
    sockets: {
      adapter: { rooms, sids },
    },
  } = wsServer;

  const publicRooms = [];

  rooms.forEach(
    (_, key) => sids.get(key) === undefined && publicRooms.push(key)
  );

  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = socket.nickname || "Anon";
  socket.emit("init_nickname", socket.nickname);

  socket.onAny((event) => {
    console.log(`EVENT: ${event}`);
  });

  // socket.on("event_name_from_front", (payload, functionFromFront)=> {...})
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);

    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
    done(countRoom(roomName));

    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1);
    });
  });

  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);

    done();
  });

  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

httpServer.listen(PORT, handleListening);
