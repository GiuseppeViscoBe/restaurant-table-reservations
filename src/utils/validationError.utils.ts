import { ZodError } from "zod";


const getErrorMessages = (error : ZodError) : string => {
  return error.errors.map((err) => err.message).join(", ");
};


export default getErrorMessages