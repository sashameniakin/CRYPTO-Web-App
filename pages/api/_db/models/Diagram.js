import mongoose from "mongoose";

const DiagramSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  inDollars: {
    type: Number,
    required: true,
  },
});

export const Diagram =
  mongoose.models.Diagram ||
  mongoose.model("Diagram", DiagramSchema, "diagram");
