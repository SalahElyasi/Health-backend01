import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, required: true, select: false },
  phone: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  age: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  experience: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  gender: { type: String, default: "" },
  image: { type: String, default: "" },
  city: { type: String, default: "" },
  languages: { type: String, default: "" },
  account_type: { type: String, default: "user" },
  user: { type: Boolean, default: false },
  therapeut: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  fluchtling: { type: Boolean, default: false },
  expertise: { type: String, default: "" },
  bio: { type: String, default: "" },
  motto: { type: String, default: "" },
  login_date: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
  
    appointments: [
      {
        date: { type: Date, default: null },
        time: { type: ObjectId, ref: "User" },
      },
    ],
});

export default model("User", userSchema);

// user: {
//   type: Boolean,
//   required: function () {
//     if (this.account_type == "user") {
//       return (this.user = true);
//     } else {
//       return (this.user = false);
//     }
//   },
// },
