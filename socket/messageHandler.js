import {
  CONNECT_USER,
  DISCONNECT_USER,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
} from "../constants/socket-constants.js";

const activeUsers = [];

export const messageHandler = (io, socket) => {
  socket.on(CONNECT_USER, () => {
    if (!activeUsers.some((user) => user.id === socket.user))
      activeUsers.push({ id: socket.user, socketId: socket.id });
    console.clear();
    console.log("Active Users");
    console.log(activeUsers);
  });

  socket.on(DISCONNECT_USER, () => {
    activeUsers.filter((user) => user.socketId !== socket.id);
  });

  socket.on(SEND_MESSAGE, (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.id === receiverId);
    console.log(activeUsers);
    if (user) io.to(user.socketId).emit(RECEIVE_MESSAGE, data);
  });
};
