import mongoose from "mongoose";

const BookmarkedSchema = new mongoose.Schema({
  rank: {
    type: Number,
  },
  name: {
    type: String,
  },

  price: {
    type: Number,
  },
  markedCap: {
    type: Number,
  },
  volume: {
    type: Number,
  },
});

export const Bookmarked =
  mongoose.models.Bookmarked ||
  mongoose.model("Bookmarked", BookmarkedSchema, "bookmarked");
