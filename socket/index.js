import { Server } from "socket.io";
import { messageHandler } from "./messageHandler.js";

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const onConnect = (socket) => {
    io.use((socket, next) => {
      socket.user = socket.handshake.query.user;
      return next();
    });

    messageHandler(io, socket);
  };

  io.on("connection", onConnect);
};

export default socket;
