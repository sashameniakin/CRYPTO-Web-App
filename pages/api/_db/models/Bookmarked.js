import mongoose from "mongoose";

const BookmarkedSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  markedCap: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
});

export const Bookmarked =
  mongoose.models.Bookmarked ||
  mongoose.model("Bookmarked", BookmarkedSchema, "bookmarked");
