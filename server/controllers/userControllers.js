import UserModel from "../models/userModels.js";



const test = (req, res) => {
    res.send("testing successful")
}

const getAllUsers = async(req, res) => {
    try {
        const allUsers = await UserModel.find({}).select("-password");
        res.status(200).json({
            status: "successfull", 
            number: allUsers.length,
            user: allUsers
        });
    } catch (e) {
        console.log("error", e)
        res.status(500).json({error: "server error"})
    }
}

export { test, getAllUsers }