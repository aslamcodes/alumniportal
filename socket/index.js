import { Server } from "socket.io";
import { messageHandler } from "./message.js";

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const onConnect = (socket) => {
    messageHandler(io, socket);
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  };

  io.on("connection", onConnect);
};

export default socket;
