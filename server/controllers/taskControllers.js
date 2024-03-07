import TaskModel from "../models/taskModels.js";
import UserModel from "../models/userModels.js";

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
  } catch (error) {
    console.log("error for getAllTasks", error);
    res.status(500).json({ message: "server error" });
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
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ message: "server error" });
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
    const addTaskToUser = await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { tasklist: newTask._id },
    });
    console.log(addTaskToUser);
    res.status(201).json({ newTask });
    // console.log(newTask);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "server error" });
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
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addEncouragements = async (req, res) => {
  try {
    const taskToUpdate = await TaskModel.findById(req.body.taskId);
    if (!taskToUpdate)
      return res.status(404).json({ message: "Task not found" });
    console.log(taskToUpdate.userId, req.user._id);
    if (req.user._id.toString() === taskToUpdate.userId.toString())
      return res.status(401).json({
        message: "can't cheer for your own butt",
      });
    if (taskToUpdate.taskEncouragements.includes(req.user._id)) {
      // return res.status(400).json({ message: "Encouragement already exists" });
      const deleteUserFromTask = await TaskModel.findByIdAndUpdate(
        req.body.taskId,
        {
          $pull: { taskEncouragements: req.user._id },
        },
        { new: true }
      ).populate({ path: "userId" });
      res.status(201).json(deleteUserFromTask);
    }
    if (taskToUpdate.completed === true) {
      return res.status(400).json({ message: "Task is already completed" });
    }
    if (!taskToUpdate.taskEncouragements.includes(req.user._id)) {
      const addUserToTask = await TaskModel.findByIdAndUpdate(
        req.body.taskId,
        {
          $push: { taskEncouragements: req.user._id },
        },
        { new: true }
      ).populate({ path: "userId" });
      res.status(201).json(addUserToTask);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong :(" });
  }
};

const addCelebrations = async (req, res) => {
  try {
    const taskToUpdate = await TaskModel.findById(req.body.taskId);
    if (!taskToUpdate) return res.status(404).json({ error: "Task not found" });
    if (taskToUpdate.taskCelebrations.includes(req.user._id)) {
      const deleteUserFromTask = await TaskModel.findByIdAndUpdate(
        req.body.taskId,
        {
          $pull: { taskCelebrations: req.user._id },
        },
        { new: true }
      ).populate({ path: "userId" });
      res.status(201).json(deleteUserFromTask);
    }
    if (taskToUpdate.completed !== true) {
      return res.status(400).json({ message: "Task is not completed yet" });
    }
    if (!taskToUpdate.taskCelebrations.includes(req.user._id)) {
      const addUserToTask = await TaskModel.findByIdAndUpdate(
        req.body.taskId,
        {
          $push: { taskCelebrations: req.user._id },
        },
        { new: true }
      );
      res.status(201).json(addUserToTask);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong :`(" });
  }
};

const deleteTask = async (req, res) => {
  const deletedTask = await TaskModel.findByIdAndDelete(req.body._id);
  try {
    if (!deletedTask) {
      return res
        .status(404)
        .json({ error: "No task with this id found or deleted." });
    }
    res.status(201).json({ deletedTask });
    console.log("Task deleted: ", deletedTask);
  } catch (error) {
    console.log("error deleting task", error);
    res.status(500).json({ message: "server error deleting task" });
  }
};

const finishedTask = async (req, res) => {
  try {
    const taskToUpdate = await TaskModel.findById(req.body.taskId);
    if (!taskToUpdate) return res.status(404).json({ error: "Task not found" });
    if (taskToUpdate.completed === true) {
      return res.status(400).json({ message: "Task is already completed" });
    }

    const addUserToTask = await TaskModel.findByIdAndUpdate(
      req.body.taskId,
      {
        completed: true,
      },
      { new: true }
    );
    res.status(201).json(addUserToTask);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong :(`" });
  }
};

const favouriteTask = async (req, res) => {
  try {
    const taskToUpdate = await TaskModel.findById(req.body.taskId);
    if (!taskToUpdate) return res.status(404).json({ error: "Task not found" });
    if (taskToUpdate.favourited === true) {
      return res.status(400).json({ message: "Task is already favourited" });
    }

    const addUserToTask = await TaskModel.findByIdAndUpdate(
      req.body.taskId,
      {
        favourited: true,
      },
      { new: true }
    );
    res.status(201).json(addUserToTask);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong :(`" });
  }
};

export {
  getAllTasks,
  findTaskByName,
  createNewTask,
  updateTask,
  deleteTask,
  addEncouragements,
  addCelebrations,
  finishedTask,
  favouriteTask,
};
