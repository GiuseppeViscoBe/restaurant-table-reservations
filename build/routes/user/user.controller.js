"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const user_validator_1 = require("../../validators/user.validator");
const user_utils_1 = __importDefault(require("../../utils/user.utils"));
const zod_1 = require("zod");
//@desc Get Users
//@route GET/user
//@access public
const getUsersList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield user_model_1.default.getUsers();
        res.status(200).json(userList);
    }
    catch (error) {
        next(error);
    }
});
//@desc Create User
//@route POST/user
//@access public
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userEmail } = user_validator_1.createUserSchema.parse(req.body);
        const existingUser = yield user_utils_1.default.checkIfUserExists(userEmail);
        if (existingUser !== undefined || existingUser !== null) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }
        const insertedUser = yield user_model_1.default.createUser({ userName, userEmail });
        res.status(200).json(insertedUser);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Extract error messages
            console.log(error.errors);
            const errorMessages = error.errors.map(err => err.message).join(', ');
            const errorCustom = new Error(errorMessages);
            errorCustom.statusCode = 400;
            // Pass the error messages to the error handler
            next(errorCustom);
        }
        else {
            // Pass unexpected errors to the error handler
            next(error);
        }
    }
});
exports.default = { createUser, getUsersList };
