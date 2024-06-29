import { db } from "../config/database";

interface User {
  id?: number;
  name: string;
  email: string;
}

const createUser = async (user: User) => {
  const insertedUserResult = await db
    .insertInto("users")
    .values(user)
    .executeTakeFirstOrThrow();

  const createdUser = await getUserById(insertedUserResult.insertId);

  return createdUser;
};

const getUserByEmail = async (email: string) => {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
};

const getUserById = async (id: any) => {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
};

export default {
  createUser,
  getUserByEmail,
  getUserById,
};
