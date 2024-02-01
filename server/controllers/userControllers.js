import UserModel from "../models/userModels.js";

const test = (req, res) => {
  console.log("testing successful");
  res.send("testing successful");
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({})
      .select("-password")
      .populate({ path: "tasklist", select: "name" });
    res.status(200).json({
      status: "successful",
      number: allUsers.length,
      user: allUsers,
    });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ error: "server error" });
  }
};

const findUserByEmail = async (req, res) => {
  console.log(req.params);
  try {
    const foundOneUser = await UserModel.findOne({
      email: req.params.email,
    }).select("-password");
    if (!foundOneUser) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json(foundOneUser);
  } catch (e) {
    console.log("error ", e);
    res.status(500).json({ error: "server error" });
  }
};

const signup = async (req, res) => {
  console.log(req.body);
  const { email, password, username } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "No fields must be empty" });
  try {
    const newUser = await UserModel.create({ email, password, username });
    console.log(newUser);
    if (newUser) res.status(201).json(newUser);
    else res.status(400).json({ error: "User couldn't be created" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      res.status(400).json({ error: "Email already registered!" });
    res.status(500).json({ error: "Something went wrong! :(" });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "No fields must be empty!" });
  try {
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser)
      return res.status(404).json({ error: "No user with that email!" });
    if (foundUser.password === password) {
      const user = {
        _id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        createdAt: foundUser.createdAt,
      };
      return res.status(200).json(user);
    } else res.status(400).json({ error: "Password incorrect!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong! :(" });
  }
};

const updateUser = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const valid = isValidObjectId(id);
  if (!valid) return res.status(400).json({ error: "invalid ID" });
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong..." });
  }
};

export { test, getAllUsers, findUserByEmail, signup, login, updateUser };
