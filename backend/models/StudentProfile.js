// models/StudentProfile.js
const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    phone: String,
    dateOfBirth: String,
    gender: String,
    nationality: String,
    passportNumber: String,
    university: String,
    studentId: String,
    program: String,
    address: String,
    emergencyContactName: String,
    emergencyContactPhone: String,
    photoURL: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
