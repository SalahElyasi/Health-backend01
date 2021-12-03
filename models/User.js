import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  phone: { type: Number },
  price: { type: Number, default: 0 },
  age: { type: Number, default: null },
  stars: { type: Number, default: null },
  likes: { type: Number, default: null },
  active: { type: Boolean, default: null },
  gender: { type: String, default: null },
  image: { type: String, default: null },
  account_type: { type: String, default: "user" },
  user: { type: Boolean, default: true },
  therapeut: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  expertise: { type: String, default: null },
  bio: { type: String, default: null },
  motto: { type: String, default: null },
  login_date: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
});

export default model("User", userSchema);
