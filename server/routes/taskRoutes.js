import express from "express";
import {
  testing,
  getAllTasks,
  findTaskByName,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.get("/testing", testing);
router.get("/all-tasks", getAllTasks);
router.get("/find-task", findTaskByName);

// taskRouter.get('/task', async (req, res) => {
//     const tasks = await task.find();
//     res.json(tasks); console.log(tasks)});

export default router;
