import express from "express";
import {
  findUserByEmail,
  getAllUsers,
  getProfile,
  login,
  signup,
  test,
  updateUser,
  uploadPicture,
} from "../controllers/userControllers.js";

import passport from "passport";
import { jwtAuth } from "../middlewares/jwtAuth.js";
import multerUpload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.get("/all", getAllUsers);
userRouter.get("/find/:email", findUserByEmail);
userRouter.get("/profile", jwtAuth, getProfile);

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update", jwtAuth, updateUser);
userRouter.post(
  "/uploadPicture",
  multerUpload.single("userImage"),
  uploadPicture
);

export default userRouter;
