import mongoose from "mongoose";

// This is a demo model! Create your own model files in this directory to model your data.

const OctopusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    default: "purple",
  },
  age: {
    type: Number,
    required: false,
  },
});

// This is important in serverless environments: Check if the model exists and otherwise create a new one.
// The model name is the first parameter you pass to mongoose.model()

export const Octopus =
  mongoose.models.Octopus ||
  mongoose.model("Octopus", OctopusSchema, "octopodes");
