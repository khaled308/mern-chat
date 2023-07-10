require("dotenv").config();
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/errorHandler");
const socketConnection = require("./utils/socket");
const User = require("./models/User");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/", async (req, res) => {
  const users = await User.find({}).select("username");
  res.json(users);
});
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  connectDB();
  socketConnection(server);
  console.log(`Server running on port ${PORT}`);
});
