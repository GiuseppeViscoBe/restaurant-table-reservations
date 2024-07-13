import { Request, Response, NextFunction } from "express";
import { errorConstants } from "../constants";
import { CustomError } from "../interfaces/error.interface";
import { z } from "zod";
import getErrorMessages from "../utils/validationError.utils";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  if (err instanceof z.ZodError) {
    const errorMessages = getErrorMessages(err);
    const errorCustom: CustomError = new Error(errorMessages);
    errorCustom.statusCode = 400;
    err = errorCustom; 
  }

  const statusCode: number = err.statusCode ? err.statusCode : 500;
  const environment = process.env.ENVIRONMENT;

  switch (statusCode) {
    case errorConstants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Error",
        message: err.message,
        stackTrace: environment == "development" ? err.stack : "",
      });
      break;
    case errorConstants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        message: err.message,
        stackTrace: environment == "development" ? err.stack : "",
      });
      break;
    case errorConstants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: environment == "development" ? err.stack : "",
      });
      break;
    case errorConstants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message: err.message,
        stackTrace: environment == "development" ? err.stack : "",
      });
      break;
    case errorConstants.CONFLICT:
      res.status(statusCode).json({
        title: "Conflict",
        message: err.message,
        stackTrace: environment == "development" ? err.stack : "",
      });
      break;
    default:
      res.status(statusCode).json({
        title: "Generic Error",
        message: err.message,
        stackTrace: environment == "development" ? err.stack : "",
      });
      break;
  }
};

export default errorHandler;
