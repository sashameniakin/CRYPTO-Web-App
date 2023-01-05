import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  blockchain: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Tasks =
  mongoose.models.Tasks || mongoose.model("Tasks", TasksSchema, "tasks");
