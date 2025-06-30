const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST /api/bookings
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking request sent!" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await Booking.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
});
router.get("/", async (req, res) => {
  const bookings = await Booking.find().populate("roomId");
  const data = bookings.map((b) => ({
    ...b.toObject(),
    room: b.roomId, // renamed for simplicity in frontend
  }));
  res.json(data);
});

// Get single booking with student & rent details
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("studentId", "name email phone")
      .populate("roomId", "title rent");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (err) {
    console.error("Booking fetch error", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/landlord/:landlordId", async (req, res) => {
  const bookings = await Booking.find({ landlordId: req.params.landlordId })
    .populate("roomId")
    .populate("studentId", "name email phone");
  res.json(bookings);
});

router.get("/student/:id", async (req, res) => {
  console.log("Fetching bookings for student ID:", req.params.id);
  try {
    const bookings = await Booking.find({ studentId: req.params.id }).populate(
      "roomId"
    );
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching student bookings:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
