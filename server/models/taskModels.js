import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  //REVIEW - how to add a whole object at once
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  description: { type: String, required: false },
  completed: { type: Boolean, required: false },
  difficulty: { type: String, required: false },
  taskEncouragements: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  taskCelebrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const TaskModel = mongoose.model("task", taskSchema);

export default TaskModel;
