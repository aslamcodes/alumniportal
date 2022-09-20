import User from "../models/User";

export const messageHandler = (io, socket) => {
  socket.on("message", async (body) => {
    const { text, to, conversation } = body;
    const user = await User.findById(socket.id);
    const userTo = await User.findById(to);
  });

  socket.on("disconnect", () => {});
};
