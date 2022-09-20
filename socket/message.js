import User from "../models/User.js";

export const messageHandler = (io, socket) => {
  socket.on("newMessage", () => {});

  socket.on("disconnect", () => {});
};
