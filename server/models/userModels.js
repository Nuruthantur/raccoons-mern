import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    username: String
}, {timestamps: true})

const UserModel = mongoose.model('users', userSchema);

export default UserModel