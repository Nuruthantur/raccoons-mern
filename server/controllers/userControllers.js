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

const findUserByEmail = async(req, res) => {
    console.log(req.params);
    try {
      const foundOneUser = await UserModel.findOne({email: req.params.email}).select("-password")
      if (!foundOneUser){
        return res.status(404).json({error: "No user found"})
      }
      res.status(200).json({foundOneUser});  
    }catch (e) {
      console.log("error ", e);
      res.status(500).json({error: "server error"})
    }
  }

export { test, getAllUsers, findUserByEmail }