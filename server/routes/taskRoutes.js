import  express  from "express";
import testing from "../controllers/taskControllers.js";

const taskRouter = express.Router()

taskRouter.get("/testing", testing) 

// taskRouter.get('/task', async (req, res) => { 
//     const tasks = await task.find(); 
//     res.json(tasks); console.log(tasks)});

export default taskRouter

