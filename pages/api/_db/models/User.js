import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
});

export const User =
  mongoose.models.Users || mongoose.model("Users", UsersSchema, "users");
