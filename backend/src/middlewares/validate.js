const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  console.log("validate.js");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
};