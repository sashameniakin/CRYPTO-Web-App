import mongoose from "mongoose";

const connectDB = handler => async (req, res) => {
  if (!process.env.MONGO_DB_URI) {
    throw new Error("Please set environment variable MONGO_DB_URI.");
  }
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.MONGO_DB_URI);
  return handler(req, res);
};

export default connectDB;
