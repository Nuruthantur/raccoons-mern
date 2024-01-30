const taskSchema = new mongoose.Schema({
    taskName: {type: String, required: true},
    userID: String,
    description: String,
    status: Boolean
}, {timestamps: true});



const TaskModel = mongoose.model(taskSchema);

export default TaskModel