import express from 'express'
import { findUserByEmail, getAllUsers, test } from '../controllers/userControllers.js'

const userRouter = express.Router()

userRouter.get("/test", test)
userRouter.get("/all", getAllUsers)
userRouter.get("/find/:email", findUserByEmail)

export default userRouter