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
const database_1 = require("../database");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const [createdUser] = yield database_1.db.insertInto('users')
        .values(user)
        .returning(['id', 'name', 'email'])
        .execute();
    return createdUser;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.db.selectFrom('users')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst();
});
exports.default = {
    createUser,
    getUserByEmail
};
// export const UserModel = {
//   async create(user: User) {
//     const [createdUser] = await db.insertInto('users')
//       .values(user)
//       .returning(['id', 'name', 'email'])
//       .execute();
//     return createdUser;
//   },
//   async findByEmail(email: string) {
//     return await db.selectFrom('users')
//       .selectAll()
//       .where('email', '=', email)
//       .executeTakeFirst();
//   },
//   async findById(id: number) {
//     return await db.selectFrom('users')
//       .selectAll()
//       .where('id', '=', id)
//       .executeTakeFirst();
//   }
// };
