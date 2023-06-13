const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.get("/api/login", (req, res) => {
  res.json({ msg: "mohamed mahmoud" });
});

authRouter.get("/api/signup", async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  const existingUSer = await User.find({ email });

  if (existingUSer) {
    return res.status(400).json({
      msg: "The email address provided already exists.",
    });
  }
    let user = User({ name, email, password, phoneNumber, address });
    user = user.save();
});

module.exports = authRouter;
