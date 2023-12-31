const asyncErrorHandler = require("../utils/async-error-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = asyncErrorHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  const { password: p, ...data } = user._doc;
  res.status(201).json({ user: { ...data, token } });
});

exports.login = asyncErrorHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Incorrect password" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  const { password: p, ...data } = user._doc;
  res.status(201).json({ user: { ...data, token } });
});

exports.getUser = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json(user);
});
