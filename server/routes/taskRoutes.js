import express from "express";
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
taskRouter.post("/task/new", createNewTask);
taskRouter.post("/task/delete/:id", deleteTask);
taskRouter.post("/task/update/:id", updateTask); //updateTask

export default taskRouter;
