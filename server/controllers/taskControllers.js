import TaskModel from "../models/taskModels.js";
import UserModel from "../models/userModels.js";

const testing = (req, res) => {
  console.log("here could be your testing");
  res.json({ message: "hi mom" });
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find({}).populate({
      path: "userId",
      select: "email",
    });
    res.status(200).json({
      status: "success",
      number: allTasks.length,
      allTasks,
    });
  } catch (e) {
    console.log("error for getAllTasks", e);
    res.status(500).json({ error: "server error" });
  }
};

const findTaskByName = async (req, res) => {
  console.log(req.params);
  try {
    const foundTask = await TaskModel.findOne({
      taskName: req.params.taskName.toLowerCase(),
    }).populate({ path: "user" });
    if (!foundTask) {
      return res.status(404).json({ error: "No task with this name found" });
    }
    res.status(200).json(foundTask);
  } catch (e) {
    console.log("error ", e);
    res.status(500).json({ error: "server error" });
  }
};

const createNewTask = async (req, res) => {
  //TODO -  build logic to check required fields coming in the request
  const {
    taskName,
    description,
    completed,
    difficulty,
    taskEncouragements,
    taskCelebrations,
  } = req.body;

  try {
    const newTask = await TaskModel.create({
      ...req.body,
      userId: req.user._id,
    });
    // console.log(newTask);
    // console.log(req.user);
    const addTaskToUser = await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { tasklist: newTask._id },
    });
    // console.log(addTaskToUser);
    res.status(201).json({ newTask });
    // console.log(newTask);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const valid = isValidObjectId(id);
  console.log(valid);
  if (!valid) return res.status(400).json({ error: "invalid ID" });
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTask) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addEncouragements = async (req, res) => {
  try {
    const taskToUpdate = await TaskModel.findById(req.body.taskId);
    if (!taskToUpdate) return res.status(404).json({ error: "Task not found" });
    if (taskToUpdate.taskEncouragements.includes(req.user._id)) {
      return res.status(400).json({ message: "Encouragement already exists" });
    }
    if (taskToUpdate.completed === true) {
      return res.status(400).json({ message: "Task is already completed" });
    }

    const addUserToTask = await TaskModel.findByIdAndUpdate(
      req.body.taskId,
      {
        $push: { taskEncouragements: req.user._id },
      },
      { new: true }
    );
    res.status(201).json(addUserToTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong :(" });
  }
};

const deleteEncouragements = async (req, res) => {
  try {
    const taskToUpdate = await TaskModel.findById(req.body.taskId);
    if (!taskToUpdate) return res.status(404).json({ error: "Task not found" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong :`(" });
  }
};

const addCelebrations = async (req, res) => {
  try {
    const taskToUpdate = await TaskModel.findById(req.body.taskId);
    if (!taskToUpdate) return res.status(404).json({ error: "Task not found" });
    if (taskToUpdate.taskCelebrations.includes(req.user._id)) {
      return res.status(400).json({ message: "Celebration already exists" });
    }
    if (taskToUpdate.completed === true) {
      return res.status(400).json({ message: "Task is already completed" });
    }

    const addUserToTask = await TaskModel.findByIdAndUpdate(
      req.body.taskId,
      {
        $push: { taskCelebrations: req.user._id },
      },
      { new: true }
    );
    res.status(201).json(addUserToTask);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong :(" });
  }
};
const deleteCelebrations = async (req, res) => {};

const deleteTask = async (req, res) => {
  const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
  try {
    res.status(201).json({ deletedTask });
    console.log("Task deleted: ", deletedTask);
  } catch (error) {
    console.log("error deleting task", error);
    res.status(500).json({ error: "server error deleting task" });
  }
};

export {
  testing,
  getAllTasks,
  findTaskByName,
  createNewTask,
  updateTask,
  deleteTask,
  addEncouragements,
  deleteEncouragements,
  addCelebrations,
  deleteCelebrations,
};
