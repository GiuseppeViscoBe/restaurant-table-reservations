import { Request, Response, NextFunction } from "express";
import userModel from "../../models/user.model";
import { createUserSchema } from "../../validators/user.validator";
import userUtils from "../../utils/user.utils";
import { CustomError } from "../../interfaces/error.interface";
import { z } from "zod";

//@desc Get Users
//@route GET/user
//@access public
const getUsersList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userList = await userModel.getUsers();

    res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
};

//@desc Create User
//@route POST/user
//@access public
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userName, userEmail } = createUserSchema.parse(req.body);

    
    const existingUser = await userUtils.checkIfUserExists(userEmail);

    if (existingUser !== undefined || existingUser !== null) {
      const error : CustomError = new Error("User already exists");
      error.statusCode = 409;
      throw error; 
    }

    const insertedUser = await userModel.createUser({ userName, userEmail });

    res.status(200).json(insertedUser);
  } catch (error) {
    next(error)
  }
};

export default { createUser, getUsersList };
