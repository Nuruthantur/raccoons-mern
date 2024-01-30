import mongoose, { Schema } from "mongoose";
import TaskModel from "./taskModels.js";

const userSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    username: String, 
    tasklist: Number, 
    finishedTasks: Number,
    tasks: [{type: Schema.Types.ObjectId, ref: 'TaskModel'}]
}, {timestamps: true});

const UserModel = mongoose.model('user', userSchema);

export default UserModel