"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    userName: zod_1.z.string().min(1, { message: "Name must not be empty" }),
    userEmail: zod_1.z.string().min(1, { message: "Email must not be empty" }).email({ message: "Email format not valid" })
});
