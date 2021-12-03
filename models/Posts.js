import User from "./User.js";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postsSchema = new Schema({
  post_id: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  post_date: { type: Date, default: Date.now },
  likes: { type: Number, default: null },
  images: { type: String, default: null },
  hidden: Boolean,
});

export default model("Posts", postsSchema);
