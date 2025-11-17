import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    await mongoose.disconnect();
  } catch (e) {
    console.error("MongoDB connection error", e);
    process.exit(1);
  }
})();