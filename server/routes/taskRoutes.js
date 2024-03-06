import express from "express";
import { jwtAuth } from "../middlewares/jwtAuth.js";

import {
  testing,
  getAllTasks,
  findTaskByName,
  createNewTask,
  deleteTask,
  updateTask,
  addEncouragements,
  deleteEncouragements,
  addCelebrations,
  deleteCelebrations,
  finishedTask,
  favouriteTask,
} from "../controllers/taskControllers.js";

const taskRouter = express.Router();

taskRouter.get("/testing", testing);
taskRouter.get("/all-tasks", getAllTasks);
taskRouter.get("/find/:taskName", findTaskByName);
taskRouter.post("/task/new", jwtAuth, createNewTask);
taskRouter.post("/task/update/:id", jwtAuth, updateTask);
taskRouter.post("/task/delete/:id", jwtAuth, deleteTask);
taskRouter.post("/task/addEncouragements", jwtAuth, addEncouragements);
taskRouter.post("/task/addCelebrations", jwtAuth, addCelebrations);
taskRouter.post("/task/finishedTask", jwtAuth, finishedTask);
taskRouter.post("/task/favourite", jwtAuth, favouriteTask);

export default taskRouter;
