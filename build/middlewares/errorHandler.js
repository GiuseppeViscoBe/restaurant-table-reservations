"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const zod_1 = require("zod");
const validationError_utils_1 = __importDefault(require("../utils/validationError.utils"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.z.ZodError) {
        const errorMessages = (0, validationError_utils_1.default)(err);
        const errorCustom = new Error(errorMessages);
        errorCustom.statusCode = 400;
        err = errorCustom;
    }
    const statusCode = err.statusCode ? err.statusCode : 500;
    const environment = process.env.ENVIRONMENT;
    switch (statusCode) {
        case constants_1.errorConstants.VALIDATION_ERROR:
            res.status(statusCode).json({
                title: "Validation Error",
                message: err.message,
                stackTrace: environment == "development" ? err.stack : "",
            });
            break;
        case constants_1.errorConstants.NOT_FOUND:
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message,
                stackTrace: environment == "development" ? err.stack : "",
            });
            break;
        case constants_1.errorConstants.UNAUTHORIZED:
            res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: environment == "development" ? err.stack : "",
            });
            break;
        case constants_1.errorConstants.FORBIDDEN:
            res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: environment == "development" ? err.stack : "",
            });
            break;
        case constants_1.errorConstants.CONFLICT:
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
exports.default = errorHandler;
