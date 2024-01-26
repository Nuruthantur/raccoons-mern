import express from 'express'
import { getAllUsers, test } from '../controllers/userControllers.js'

const userRouter = express.Router()

userRouter.get("/test", test)
userRouter.get("/all", getAllUsers)

export default userRouter