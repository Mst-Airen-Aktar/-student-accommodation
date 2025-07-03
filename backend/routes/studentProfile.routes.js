const express = require("express");
const router = express.Router();
const Student = require("../models/StudentProfile");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.config");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "finnroom/students",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});
const upload = multer({ storage });

router.post(
  "/:uid",
  upload.fields([
    { name: "passportPhoto", maxCount: 1 },
    { name: "studentId", maxCount: 1 },
    { name: "admissionLetter", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        phone,
        dateOfBirth,
        gender,
        nationality,
        passportNumber,
        university,
        studentId,
        program,
        address,
        emergencyContactName,
        emergencyContactPhone,
        photoURL,
      } = req.body;

      const updateData = {
        phone,
        dateOfBirth,
        gender,
        nationality,
        passportNumber,
        university,
        studentId,
        program,
        address,
        emergencyContactName,
        emergencyContactPhone,
        photoURL,
      };

      if (req.files.passportPhoto) {
        updateData.documents = updateData.documents || {};
        updateData.documents.passportPhotoUrl = req.files.passportPhoto[0].path;
      }

      if (req.files.studentId) {
        updateData.documents = updateData.documents || {};
        updateData.documents.studentIdUrl = req.files.studentId[0].path;
      }

      if (req.files.admissionLetter) {
        updateData.documents = updateData.documents || {};
        updateData.documents.admissionLetterUrl =
          req.files.admissionLetter[0].path;
      }

      const profile = await Student.findOneAndUpdate(
        { uid: req.params.uid },
        { uid: req.params.uid, ...updateData },
        { new: true, upsert: true }
      );

      res.json(profile);
    } catch (err) {
      console.error("Error updating student profile:", err);
      res.status(500).json({ message: "Failed to update profile" });
    }
  }
);

// Create or update student profile
// router.post("/", async (req, res) => {
//   const { uid, ...profileData } = req.body;

//   try {
//     const updated = await Student.findOneAndUpdate(
//       { uid },
//       { uid, ...profileData },
//       { upsert: true, new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to update profile" });
//   }
// });

//Get profile by UID
router.get("/:uid", async (req, res) => {
  try {
    const profile = await Student.findOne({ uid: req.params.uid });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", async (req, res) => {
  const students = await Student.find(); // import Student model
  res.json(students);
});

router.put("/verify/:uid", async (req, res) => {
  try {
    const { verified } = req.body;
    const updated = await Student.findOneAndUpdate(
      { uid: req.params.uid },
      { verified },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
});

module.exports = router;
