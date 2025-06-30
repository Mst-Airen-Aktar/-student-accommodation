const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    // studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    studentId: {
      type: String, // ✅ instead of ObjectId
      required: true,
    },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    startDate: Date,
    endDate: Date,
    rentHistory: [
      {
        month: String,
        amount: Number,
        paidOn: Date,
        status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
      },
    ],

    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String },
    message: { type: String },
    // status: { type: String, default: "pending" }, // can be "pending", "approved", "rejected"
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
