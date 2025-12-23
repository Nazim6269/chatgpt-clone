import mongoose from "mongoose";
import { mongoUrl } from "../secret.js";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null };
}

export const connectMongo = async () => {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(mongoUrl);
  console.log("✅ Mongo is connected successfully");
  return cached.conn;
};
