import UserModel from "../models/userModels.js";
import {
  encryptUserPassword,
  verifyPassword,
} from "../utils/passwordServices.js";
import { generateToken } from "../utils/tokenServices.js";

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
  if (email === "undefined" || password === "undefined") {
    res.status(400).json({ error: "No field must be empty!" });
    return;
  }
  try {
    // if all credentials provided, we check if user is already in database

    const existingUser = await UserModel.findOne({ email: email });
    console.log("existing User -->", existingUser);
    // check if user with this email already exists in the db
    if (existingUser) {
      res.status(400).json({ error: "Email already registered" });
    }
    // if there's no user with this email in the db
    if (!existingUser) {
      // encrypt password

      try {
        const hashedPassword = await encryptUserPassword(password);
        if (!hashedPassword) {
          res.status(500).json({ message: "problem encoding password" });
        }
        if (hashedPassword) {
          const newUser = await UserModel.create({
            email: email,
            password: hashedPassword,
            userName: username,
          });
          console.log("newUser", newUser);
          if (newUser) {
            res.status(201).json(newUser);
          } else res.status(400).json({ error: "User couldn't be created" });
        }
      } catch (error) {
        console.log("sth very very bad happened ^^", error);
      }
    }
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      res.status(400).json({ error: "Email already registered!" });
    res.status(500).json({ error: "Something went wrong! :(" });
  }
};

// const login = async (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ error: "No fields must be empty!" });
//   try {
//     const foundUser = await UserModel.findOne({ email });
//     if (!foundUser)
//       return res.status(404).json({ error: "No user with that email!" });
//     if (foundUser.password === password) {
//       const user = {
//         _id: foundUser._id,
//         email: foundUser.email,
//         username: foundUser.username,
//         createdAt: foundUser.createdAt,
//       };
//       return res.status(200).json(user);
//     } else res.status(400).json({ error: "Password incorrect!" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Something went wrong! :(" });
//   }
// };

const login = async (req, res) => {
  if (!req.body.password || !req.body.email) {
    console.log("no credentials");
    res.status(500).json({
      message: "required fields are missing",
      error: true,
      data: null,
    });
    return;
  }
  console.log("credentials", req.body);
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    console.log("existing user: ", existingUser);
    // A there is no user in DB
    if (!existingUser) {
      res.status(500).json({
        message: "user needs to register first",
        error: true,
        data: null,
      });
    }
    // B email exists in DB
    if (existingUser) {
      //B1 check password (verify)
      const isPasswordCorrect = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      //C1 passwords do NOT match
      if (!isPasswordCorrect) {
        res.status(500).json({
          message: "passwords do not match!",
          error: true,
          data: null,
        });
      }
      //C 2 passwords DO match
      if (isPasswordCorrect) {
        //D generate Token
        const token = generateToken(existingUser._id);
        // D 1 token is NOT generated
        if (!token) {
          res.status(500).json({
            message: "something went wrong generating the token",
            error: true,
            data: null,
          });
        }
        //D2 token is generated
        if (token) {
          const user = {
            username: existingUser.username,
            email: existingUser.email,
          };
          res.status(200).json({
            message: "user logged in",
            error: false,
            data: {
              user: user,
              token,
            },
          });
        }
      }
    }
  } catch (error) {
    console.log("error from existingUser", error);
    res.status(500).json({
      message: "an unexpected error happened here",
      error: true,
      data: null,
    });
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
