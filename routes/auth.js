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
  createPost,
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
authRouter.patch("/update/:id", update);

export default authRouter;
