// routes/studentProfile.routes.js
const express = require("express");
const router = express.Router();
const Student = require("../models/StudentProfile");

// Create or update student profile
router.post("/", async (req, res) => {
  const { uid, ...profileData } = req.body;

  try {
    const updated = await Student.findOneAndUpdate(
      { uid },
      { uid, ...profileData },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// Get profile by UID
router.get("/:uid", async (req, res) => {
  try {
    const profile = await Student.findOne({ uid: req.params.uid });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
