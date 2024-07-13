import express from 'express'
import userController from './user.controller'

const userRouter = express.Router()

userRouter.get('/users', userController.getUsersList)
userRouter.post('/users', userController.createUser)

export default userRouter