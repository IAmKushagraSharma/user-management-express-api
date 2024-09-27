import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/express-mark1");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection error:", error);

    process.exit(1);
  }
};
