const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" }); // Load environment variables from .env.local

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Corrected variable access
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env.local");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Stop the process if DB connection fails
  }
};

module.exports = { connectDB };
