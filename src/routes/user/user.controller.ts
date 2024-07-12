import { Request, Response, NextFunction } from "express";
import userModel from "../../models/user.model";
import { createUserSchema } from "../../validators/user.validator";
import userUtils from '../../utils/user.utils'

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
  }  catch (error) {
    if (error instanceof z.ZodError) {
      // Extract error messages
      console.log(error.errors)
      const errorMessages = error.errors.map(err => err.message).join(', ');
      const errorCustom : CustomError = new Error(errorMessages);
      errorCustom.statusCode = 400;
      // Pass the error messages to the error handler
      next(errorCustom);
    } else {
      // Pass unexpected errors to the error handler
      next(error);
    }
  }
};

export default { createUser };


