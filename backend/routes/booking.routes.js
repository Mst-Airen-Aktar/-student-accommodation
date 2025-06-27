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

module.exports = router;
