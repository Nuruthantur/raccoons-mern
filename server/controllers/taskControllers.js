import TaskModel from "../models/taskModels.js";

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
      name: req.params.taskName,
    }).select("-password");
    if (!foundTask) {
      return res.status(404).json({ error: "No task with this name found" });
    }
    res.status(200).json(foundTask);
  } catch (e) {
    console.log("error ", e);
    res.status(500).json({ error: "server error" });
  }
};

export { testing, getAllTasks, findTaskByName };
