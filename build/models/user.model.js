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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const insertedUserResult = yield database_1.db
        .insertInto("users")
        .values(user)
        .executeTakeFirst();
    const createdUser = yield getUserById(insertedUserResult.insertId);
    return createdUser;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userByEmailResult = yield database_1.db
        .selectFrom("users")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst();
    return userByEmailResult;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userResultById = yield database_1.db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();
    return userResultById;
});
exports.default = {
    createUser,
    getUserByEmail,
    getUserById,
};
