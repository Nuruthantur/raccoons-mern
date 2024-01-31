import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // _id: Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: false },
    tasklist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "task", required: false },
    ],
    finishedTasks: { type: Number, required: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
