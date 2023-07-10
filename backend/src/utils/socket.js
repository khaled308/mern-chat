const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

const socketConnection = (server) => {
  const connectedUsers = new Map();
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token?.split(" ")[1];
    if (!token) {
      return next(new AppError("Authentication error", 401));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.username = decoded.username;
      next();
    } catch (err) {
      console.log(err);
      return next(new AppError("Authentication error", 401));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User ${socket.userId} connected`);
    connectedUsers.set(socket.userId, socket.username);
    socket.emit("connectedUsers", [...connectedUsers]);

    socket.on("disconnect", () => {
      connectedUsers.delete(socket.userId);
      socket.broadcast.emit("connectedUsers", [...connectedUsers]);
    });

    socket.broadcast.emit("connectedUsers", [...connectedUsers]);
  });

  return io;
};

module.exports = socketConnection;
