const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    let user = User({ name, email, password: hPassword, phoneNumber, address });
    user = await user.save();

    const token = jwt.sign({ id: User._id }, "token");
    res.json({
      token,
      ...user._doc,
    });

    //    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUSer = await User.findOne({ email });
    if (!existingUSer) {
      return res.status(400).json({
        msg: "The email address provided doesn't exist",
      });
    }
    const isMatched = bcrypt.compare(password, existingUSer.password);
    if (!isMatched) {
      return res.status(400).json({
        msg: "Incorrect Password!",
      });
    }

    const token = jwt.sign({ id: User._id }, "token");
    res.json({
      token,
      ...existingUSer._doc,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/isValidToken", async (req, res) => {
  try {
    const token = req.header("token");
    if (!token) return res.status(502).json(false);
    const verified = jwt.verify(token, "token");
    if (!verified) {
      return res.status(502).json(false);
    } else {
      const user = await User.findById(verified.id);
      if (!user) {
        return res.status(502).json(false);
      } else {
        return res.json(true);
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = authRouter;
