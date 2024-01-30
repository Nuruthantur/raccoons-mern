import TaskModel from "../models/taskModels.js";

const testing = (req, res) => {
    console.log("here could be your testing");
    res.json({ message: "hi mom"})
}
export default testing