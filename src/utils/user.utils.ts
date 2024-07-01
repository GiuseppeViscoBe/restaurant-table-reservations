import { CustomError } from "../interfaces/error.interface";
import userModel from "../models/user.model";

const checkIfUserExists = async (email: string): Promise<void> => {

    const existingUser = await userModel.getUserByEmail(email);
    
    if (existingUser) {
        
      const error : CustomError = new Error("User already exists");
      error.statusCode = 409;
      throw error; 
    }
  };

  const checkIfUserDoesNotExists = async (email: string): Promise<void> => {

    const existingUser = await userModel.getUserByEmail(email);
    
    if (!existingUser) {
      const error : CustomError = new Error("User does not exists");
      error.statusCode = 404;
      throw error; 
    }
  };

  export default {
    checkIfUserExists,
    checkIfUserDoesNotExists
  }