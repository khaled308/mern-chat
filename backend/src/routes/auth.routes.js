const { register, login } = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/user-validation");

const router = require("express").Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
