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

// routes/user.routes.js
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find({ role: { $ne: "admin" } }); // exclude admin
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// GET all users with optional pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit);

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
});

// POST /api/admins - Create new admin
router.post("/", async (req, res) => {
  const { uid, name, email } = req.body;

  try {
    // Check if already exists
    const existing = await User.findOne({ uid });
    if (existing) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const newAdmin = new User({
      uid,
      name,
      email,
      role: "admin",
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully", newAdmin });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// routes/user.routes.js
router.put("/verify/:id", async (req, res) => {
  try {
    const { verified, verificationNote } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { verified, verificationNote },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:uid", async (req, res) => {
  console.log("Fetching user with UID:", req.params.uid);
  try {
    const user = await User.findOne({ uid: req.params.uid });
    console.log("User found:", user);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
