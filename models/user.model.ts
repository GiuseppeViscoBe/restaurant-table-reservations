import { db } from "../config/database";
import {User} from "./../interfaces/user.interface"


const createUser = async (user: User) : Promise<User | undefined> => {
  const insertedUserResult = await db
    .insertInto("users")
    .values(user)
    .executeTakeFirstOrThrow();

  const createdUser = await getUserById(insertedUserResult.insertId);

  return createdUser;
};

const getUserByEmail = async (email: string) : Promise<User | undefined> => {
  const userByEmailResult =  await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

    return userByEmailResult
};

const getUserById = async (id: any) : Promise<User | undefined> => {
  const userResultById =  await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

    return userResultById
};

export default {
  createUser,
  getUserByEmail,
  getUserById,
};
