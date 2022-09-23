import {
  CONNECT_USER,
  DISCONNECT_USER,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
} from "../constants/socket-constants.js";

let activeUsers = [];

export const messageHandler = (io, socket) => {
  socket.on(CONNECT_USER, () => {
    if (!activeUsers.some((user) => user.id === socket.user))
      activeUsers.push({ id: socket.user, socketId: socket.id });

    console.clear();
    console.log("Active Users");
    console.log(activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    console.clear();
    console.log("Active Users");
    console.log(activeUsers);
  });

  socket.on(SEND_MESSAGE, (data) => {
    const { receiverId } = data;
    const receiver = activeUsers.find((user) => user.id === receiverId);
    if (receiver) io.to(receiver.socketId).emit(RECEIVE_MESSAGE, data);
    console.clear();
    console.log("Active Users");
    console.log(activeUsers);
  });
};
