import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  description: { type: String, required: false },
  completed: { type: Boolean, required: false },
  difficulty: { type: String, required: false },
  status: Boolean,
  taskEncouragements: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  taskCelebrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const TaskModel = mongoose.model("task", taskSchema);

export default TaskModel;
