// server.js
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/config");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials if needed
  })
);

// Connect MongoDB
connectDB();

// Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/rooms", require("./routes/room.routes"));
app.use("/api/upload", require("./routes/upload.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/student-profile", require("./routes/studentProfile.routes"));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
