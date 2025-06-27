// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { uid, name, email, role } = req.body;

  try {
    const existingUser = await User.findOne({ uid });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ uid, name, email, role });
    await newUser.save();

    res.status(201).json({ message: "User registered and stored in MongoDB" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
