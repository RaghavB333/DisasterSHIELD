import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    await mongoose.connect(uri); // ✅ Removed deprecated options

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
