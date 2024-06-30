import { Request, Response, NextFunction } from "express";
import userModel from "./../../models/user.model";
import { createUserSchema } from "./../../validators/user.validator";

//@desc Create User
//@route POST/user
//@access public
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email } = createUserSchema.parse(req.body);

    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      const error = new Error("User already exists");
      res.status(409);
      return next(error);
    }

    const insertedUser = await userModel.createUser({ name, email });

    res.status(200).json(insertedUser);
  } catch (error) {
    next(error);
  }
};

export default { createUser };
