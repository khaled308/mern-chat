const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const AppError = require("./AppError");
const User = require("../models/User");

let users;
const getUsers = async (onlineUsers, users) => {
  if (!users) {
    users = await User.find({}).select("username");
  }
  const usersWithStatus = users.map((user) => {
    const isOnline = onlineUsers.includes(user.username);
    return { ...user.toObject(), isOnline };
  });

  return usersWithStatus;
};

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
      // update users if not contain connected user id
      if (users && !users.some((user) => user._id === decoded.id)) {
        users = User.find({}).select("username");
      }
      socket.userId = decoded.id;
      socket.username = decoded.username;
      next();
    } catch (err) {
      console.log(err);
      return next(new AppError("Authentication error", 401));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`User ${socket.userId} connected`);
    connectedUsers.set(socket.userId, socket.username);
    const onlineUsernames = [...connectedUsers.values()];
    const usersWithStatus = await getUsers(onlineUsernames, users);
    socket.emit("connectedUsers", usersWithStatus);

    socket.on("disconnect", async () => {
      connectedUsers.delete(socket.userId);
      const onlineUsernames = [...connectedUsers.values()];
      const usersWithStatus = await getUsers(onlineUsernames, users);
      socket.broadcast.emit("connectedUsers", usersWithStatus);
    });

    socket.broadcast.emit("connectedUsers", usersWithStatus);
  });

  return io;
};

module.exports = socketConnection;
