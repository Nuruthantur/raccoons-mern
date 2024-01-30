import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {type: String}, //required: true
    taskID: String,
    user: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    // taskID: {type: Number, ref:'User'},
    // {type: mongoose.Schema.Types.ObjectId, ref: 'userSchema'},
    description: String,
    status: Boolean
},);

const TaskModel = mongoose.model('task', taskSchema);

export default TaskModel

