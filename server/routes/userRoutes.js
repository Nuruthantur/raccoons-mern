import express from "express";
import {
  findUserByEmail,
  getAllUsers,
  getProfile,
  login,
  signup,
  test,
  updateUser,
} from "../controllers/userControllers.js";
import { createNewTask, deleteTask } from "../controllers/taskControllers.js";
import passport from "passport";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.get("/all", getAllUsers);
userRouter.get("/find/:email", findUserByEmail);
userRouter.get("/profile", jwtAuth, getProfile);

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update/:id", updateUser);
userRouter.post("/task/new", createNewTask);
userRouter.post("/task/delete/:id", deleteTask);

export default userRouter;
