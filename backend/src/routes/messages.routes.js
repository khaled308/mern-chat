const { isAuth } = require("../middlewares/auth");
const Message = require("../models/Message");

const router = require("express").Router();

router.get("/:userId", isAuth, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { from: userId, to: req.user.id },
        { from: req.user.id, to: userId },
      ],
    });
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
