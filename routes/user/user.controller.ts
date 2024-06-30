import { Request, Response, NextFunction } from "express";
import userModel from "./../../models/user.model";
import { createUserSchema } from "./../../validators/user.validator";
import userUtils from './../../utils/user.utils'

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

    await userUtils.checkIfUserExists(userEmail);

    const insertedUser = await userModel.createUser({ userName, userEmail });

    res.status(200).json(insertedUser);
  } catch (error) {
    next(error);
  }
};

export default { createUser };


