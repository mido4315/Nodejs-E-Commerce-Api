const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    const existingUSer = await User.findOne({ email });

    if (existingUSer) {
      return res.status(400).json({
        msg: "The email address provided already exists.",
      });
    }
    const hPassword = await bcrypt.hash(password, 8);
    let user = User({ name, email, password : hPassword, phoneNumber, address });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
