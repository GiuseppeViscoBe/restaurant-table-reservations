import { Request, Response, NextFunction } from "express";
import userModel from "./../../models/user.model";
import {createUserSchema} from "./../../validators/user.validator"
import asyncHandler from 'express-async-handler'

// const getUserByEmail = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email } = req.params;

//     console.log(email);
//     const existingUser = await userModel.getUserByEmail(email);
//     if (existingUser) {
//         const error = new Error("User already exists");
//         res.status(403);
//         return next(error);
//     }

//     res.status(200).json({ existingUser });
//   } catch (error) {
//     next(error);
//   }
// };

// const getUserByEmail = asyncHandler(async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//       const { email } = req.params;
  
//       console.log(email);
//       const existingUser = await userModel.getUserByEmail(email);
//       if (!existingUser) {
//           const error = new Error("User does not exists");
//           res.status(404);
//           return next(error);
//       }
      
//       res.status(200).json({ existingUser });   
//   });
  

const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
