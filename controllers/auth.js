import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorResponse("Email already in use", 403));
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 7);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // create token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    data: newUser,
    token,
  });
});
// export const signUp = asyncHandler(async (req, res, next) => {
//   const { name, email, password } = req.body;
//   const foundUser = await User.findOne({ email });
//   if (foundUser) throw new ErrorResponse("Email already taken", 403);
//   const hashPassword = await bcrypt.hash(password, 5);
//   const { _id, name: userName } = await User.create({
//     name,
//     email,
//     password: hashPassword,
//   });
//   const token = jwt.sign({ _id, userName }, process.env.JWT_SECRET);
//   res.json({ token });
// });

export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email }).select("+password");
  if (!foundUser) throw new Error("User does not exist");
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) throw new Error("Password is incorrect");
  const token = jwt.sign(
    { _id: foundUser._id, userName: foundUser.name },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

export const getUserInfo = asyncHandler(async (req, res) => {
  res.send(req.user);
});

export const approvedSession = asyncHandler(async (req, res) => {
  res.json({ success: "Valid token" });
});