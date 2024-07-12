import express from 'express'
import userController from './user.controller'

const userRouter = express.Router()

userRouter.get('/user', userController.getUsersList)
userRouter.post('/user', userController.createUser)

export default userRouter