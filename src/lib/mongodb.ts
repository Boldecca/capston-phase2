import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) throw new Error("MONGODB_URI is not defined");

declare global {
  var _mongoClientPromise: Promise<typeof mongoose> | undefined;
}

if (!global._mongoClientPromise) {
  mongoose.set("strictQuery", false);
  global._mongoClientPromise = mongoose.connect(MONGO_URI);
}

export default mongoose;