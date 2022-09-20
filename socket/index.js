import { Server } from "socket.io";

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const onConnect = (socket) => {
    console.log("Socket connected");
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  };

  io.on("connection", onConnect);
};

export default socket;
