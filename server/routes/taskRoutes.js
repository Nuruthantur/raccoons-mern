import express from "express";
import { jwtAuth } from "../middlewares/jwtAuth.js";

import {
  testing,
  getAllTasks,
  findTaskByName,
  createNewTask,
  deleteTask,
  updateTask,
} from "../controllers/taskControllers.js";

const taskRouter = express.Router();

taskRouter.get("/testing", testing);
taskRouter.get("/all-tasks", getAllTasks);
taskRouter.get("/find/:taskName", findTaskByName);
taskRouter.post("/task/new", jwtAuth, createNewTask);
taskRouter.post("/task/delete/:id", deleteTask);
taskRouter.post("/task/update/:id", updateTask); //updateTask

export default taskRouter;
