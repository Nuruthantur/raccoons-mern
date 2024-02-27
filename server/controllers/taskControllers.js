import TaskModel from "../models/taskModels.js";
import UserModel from "../models/userModels.js";

const testing = (req, res) => {
  console.log("here could be your testing");
  res.json({ message: "hi mom" });
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find({}).populate({
      path: "user",
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
      taskName: req.params.taskName,
    })
      .select("-password")
      .populate({ path: "user" });
    if (!foundTask) {
      return res.status(404).json({ error: "No task with this name found" });
    }
    res.status(200).json(foundTask);
  } catch (e) {
    console.log("error ", e);
    res.status(500).json({ error: "server error" });
  }
};

const findTaskById = async (req, res) => {
  try {
  } catch (error) {}
};

const createNewTask = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.user", req.user);
  //build logic to check required fields coming in the request

  try {
    const newTask = await TaskModel.create(req.body);
    console.log(newTask);
    console.log(req.user);
    const addTaskToUser = await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { tasklist: newTask._id },
    });
    console.log(addTaskToUser);
    res.status(201).json({ newTask });
    console.log(newTask);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const valid = isValidObjectId(id);
  console.log(valid);
  if (!valid) return res.status(400).json({ error: "id invalid" });
  try {
    const updatedTask = await TaskModel.findBSyIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTask) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

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
};
