import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config.js";
import "./db/mongoose.js";
import authRouter from "./routes/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import {
  createPost,
  getPostById,
  getPost,
  getUser,
} from "./controllers/auth.js";

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.get("/user", getUser);

// app.get("/getpost/:id", getPostById);
app.get("/getpost", getPost);
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
