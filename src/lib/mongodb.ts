import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}

// Save a global variable to store the connection
const cached = (global as any)._mongoose || { conn: null, promise: null }; // eslint-disable-line

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "yourDatabaseName",
        bufferCommands: false, // Prevent mongoose from buffering commands when the connection is down
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then((mongoose) => {
        console.log("✅ Connected to MongoDB");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// This is the recommended way to use it in Next.js
if (process.env.NODE_ENV === "development") {
  (global as any)._mongoose = cached; // eslint-disable-line
}
