import { CustomError } from "../interfaces/error.interface";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";

const checkIfUserExists = async (email: string): Promise<void> => {

    const existingUser = await userModel.getUserByEmail(email);
    
    if (existingUser) {
        
      const error : CustomError = new Error("User already exists");
      error.statusCode = 409;
      throw error; 
    }
  };

  const checkIfUserDoesNotExists = async (email: string): Promise<User | undefined> => {

    const existingUser = await userModel.getUserByEmail(email);
    
    return existingUser
  };

  export default {
    checkIfUserExists,
    checkIfUserDoesNotExists
  }