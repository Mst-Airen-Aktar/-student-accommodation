const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET /api/rooms?city=Helsinki&minRent=400&maxRent=800&furnished=true
router.get("/", async (req, res) => {
  try {
    const {
      city,
      minRent,
      maxRent,
      roomType,
      furnished,
      privateBathroom,
      internetIncluded,
      minSize,
      maxSize,
      availableFrom,
      keyword,
    } = req.query;
    console.log("Received query parameters:", req.query); // Debugging line
    const filter = {};

    if (city) filter.city = new RegExp(city, "i");
    if (roomType) filter.roomType = roomType;
    if (furnished !== undefined) filter.furnished = furnished === "true";
    if (privateBathroom !== undefined)
      filter.privateBathroom = privateBathroom === "true";
    if (internetIncluded !== undefined)
      filter.internetIncluded = internetIncluded === "true";

    if (minRent || maxRent) {
      filter.rent = {};
      if (minRent) filter.rent.$gte = Number(minRent);
      if (maxRent) filter.rent.$lte = Number(maxRent);
    }

    if (minSize || maxSize) {
      filter.roomSize = {};
      if (minSize) filter.roomSize.$gte = Number(minSize);
      if (maxSize) filter.roomSize.$lte = Number(maxSize);
    }

    if (availableFrom) {
      filter.availableFrom = { $lte: new Date(availableFrom) };
    }

    if (keyword) {
      filter.$or = [
        { title: new RegExp(keyword, "i") },
        { description: new RegExp(keyword, "i") },
      ];
    }

    const rooms = await Room.find(filter).sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST /api/rooms - Add new room
router.post("/", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error("Error adding room:", error.message);
    res.status(500).json({ message: "Failed to add room" });
  }
});

// GET /api/rooms - Optional: Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// Get room by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/rooms/landlord/:uid - Rooms posted by one landlord
router.get("/landlord/:uid", async (req, res) => {
  try {
    const rooms = await Room.find({ postedBy: req.params.uid });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your rooms" });
  }
});

module.exports = router;
