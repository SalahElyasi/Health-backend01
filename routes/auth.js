import express from "express";
import { signUpBody } from "../joi/schemas.js";
import { postBody } from "../joi/schemas.js";
import { body } from "express-validator";
import {
  signUp,
  signIn,
  getUserInfo,
  approvedSession,
  update,
  likePost,
  unlikePost,
  createPost,
  myPosts,
  commentPost,
  deletePost,
  deleteCommentPost,
} from "../controllers/auth.js";
import verifyToken from "../middlewares/verifyToken.js";
import validateJOI from "../middlewares/validateJOI.js";
import checkForErrors from "../middlewares/checkForErrors.js";

const authRouter = express.Router();

authRouter.post("/signup", validateJOI(signUpBody), signUp); //
authRouter.post(
  "/signin",
  body("email").exists().isEmail(),
  body("password").exists().isString(),
  checkForErrors,
  signIn
);
authRouter.get("/me", verifyToken, getUserInfo);
authRouter.get("/verify-session", verifyToken, approvedSession);
authRouter.patch("/update/:id", verifyToken, update);
authRouter.post("/createpost", verifyToken, createPost);
authRouter.get("/myposts", verifyToken, myPosts);

authRouter.put("/like", verifyToken, likePost);
authRouter.put("/unlike", verifyToken, unlikePost);
authRouter.patch("/comment/:id", verifyToken, commentPost);
authRouter.put("/deletecomment", verifyToken, deleteCommentPost);
authRouter.delete("/deletepost/:id", verifyToken, deletePost);

export default authRouter;
