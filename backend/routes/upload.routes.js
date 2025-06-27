const express = require("express");
const multer = require("multer");
// const { v2: cloudinary } = require("cloudinary");
const cloudinary = require("../config/cloudinary.config"); // Adjust the path as necessary
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express.Router();

// Setup storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "finnroom",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post("/", upload.array("images", 3), async (req, res) => {
  console.log("🚀 Upload request received:", req.files); // ADD THIS
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files received" });
    }

    const urls = req.files.map((file) => file.path);
    res.status(200).json(urls);
  } catch (error) {
    console.error("❌ Upload failed:", error); // ADD THIS
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

module.exports = router;
