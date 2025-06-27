// const { MongoClient, ServerApiVersion } = require("mongodb");
// require("dotenv").config();

// const uri = process.env.MONGO_URI;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log("✅ MongoDB connected successfully");

//     // Optional: ping to test
//     await client.db("admin").command({ ping: 1 });

//     // You can also export the specific database if you want
//     const db = client.db("yourDatabaseName"); // change this
//     return { client, db };
//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err);
//     process.exit(1); // Stop server if DB fails
//   }
// }

// module.exports = { connectDB, client };

// config/mongoose.config.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Mongoose connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Mongoose connection failed:", err);
    process.exit(1); // Stop server on DB error
  }
};

module.exports = connectDB;
