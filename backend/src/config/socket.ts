import { Server } from "socket.io";

let io: Server;

export const initSocket = (
  server: any
) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `Socket Connected: ${socket.id}`
    );
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io not initialized"
    );
  }

  return io;
};