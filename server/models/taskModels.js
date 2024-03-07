import mongoose, { Schema } from "mongoose";

//REVIEW - Mongoose schema for Task model; the userId, taskEncouragements, and taskCelebrations are populated from the User model

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  description: { type: String, required: false },
  completed: { type: Boolean, required: false },
  difficulty: { type: String, required: false },
  taskEncouragements: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  taskCelebrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const TaskModel = mongoose.model("task", taskSchema);

export default TaskModel;
