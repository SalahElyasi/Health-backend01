import User from "./User.js";
const { ObjectId } = mongoose.Schema.Types;
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postsSchema = new Schema(
  {
    user_id: { type: ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    post_date: { type: Date, default: Date.now },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    images: { type: String, default: null },
    archive: { type: Boolean, default: false },
    public_view: { type: Boolean, default: false },
    page_view: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Posts", postsSchema);
