// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "landlord", "admin"],
    required: true,
  },
  profileImage: { type: String },
  verified: { type: Boolean, default: false }, // new
  verificationNote: { type: String }, // admin note
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
