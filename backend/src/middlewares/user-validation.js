const { check } = require("express-validator");
const User = require("../models/User");
const validate = require("./validate");
const AppError = require("../utils/AppError");

exports.registerValidation = [
  check("username")
    .notEmpty()
    .withMessage("Please provide a username")
    .custom(async (value) => {
      const username = await User.findOne({ username: value });
      if (username) {
        throw new AppError("Username already in use", 400);
      }
    }),
  check("email", "Please provide a email")
    .isEmail()
    .custom(async (value) => {
      const email = await User.findOne({ email: value });
      if (email) {
        throw new AppError("Email already in use", 400);
      }
    }),
  check("password", "Please provide a password").not().isEmpty(),
  validate,
];

exports.loginValidation = [
  check("username", "Please provide a username").not().isEmpty(),
  check("password", "Please provide a password").not().isEmpty(),
  validate,
];
