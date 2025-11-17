import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI;
if (!MONGO_URI) throw new Error("Please define MONGODB_URI in .env.local");

declare global {
  // allow caching across hot-reloads in development
  var _mongoClientPromise: Promise<typeof mongoose> | undefined;
}

let cachedPromise = (global as any)._mongoClientPromise as Promise<typeof mongoose> | undefined;

if (!cachedPromise) {
  mongoose.set("strictQuery", false);
  cachedPromise = mongoose.connect(MONGO_URI);
  (global as any)._mongoClientPromise = cachedPromise;
}

export async function connect() {
  await cachedPromise;
  return mongoose;
}

export default mongoose;