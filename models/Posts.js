import User from "./User.js";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  post_date: { type: Date, default: Date.now },
  likes: { type: Number, default: null },
  images: { type: String, default: null },
  archive: { type: Boolean, default: false },
  public_view: { type: Boolean, default: false },
  page_view: { type: Boolean, default: false },
});

export default model("Posts", postsSchema);
