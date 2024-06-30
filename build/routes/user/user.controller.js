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
const user_model_1 = __importDefault(require("./../../models/user.model"));
const user_validator_1 = require("./../../validators/user.validator");
//@desc Create User
//@route POST/user
//@access public
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = user_validator_1.createUserSchema.parse(req.body);
        const existingUser = yield user_model_1.default.getUserByEmail(email);
        if (existingUser) {
            const error = new Error("User already exists");
            res.status(409);
            return next(error);
        }
        const insertedUser = yield user_model_1.default.createUser({ name, email });
        res.status(200).json(insertedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.default = { createUser };
