const { register, login, getUser } = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/auth");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/user-validation");

const router = require("express").Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/user", isAuth, getUser);

module.exports = router;
