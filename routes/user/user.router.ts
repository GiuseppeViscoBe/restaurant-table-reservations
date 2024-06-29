import express from 'express'
import userController from './user.controller'

const userRouter = express.Router()


// userRouter.get('/user/:email', userController.getUserByEmail)
userRouter.post('/user', userController.createUser)

export default userRouter