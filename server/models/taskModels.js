import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  description: { type: String, required: false },
  difficulty: { type: String, required: false },
  status: Boolean,
});

const TaskModel = mongoose.model("task", taskSchema);

export default TaskModel;
