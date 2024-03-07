import mongoose, { Schema } from "mongoose";

//REVIEW - Mongoose schema for User model; the taskList and finishedTasks are populated from the Task model

const userSchema = new mongoose.Schema(
  {
    // _id: Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: false, unique: true },
    userImage: { type: String, required: false, unique: false },
    tasklist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "task", required: false },
    ],
    finishedTasks: { type: Number, required: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
