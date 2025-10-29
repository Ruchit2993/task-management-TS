import User from "./user.model.js";
import bcrypt from "bcrypt";
import { FindOptions } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  contact?: string | null;
  isAdmin: boolean;
  isFirstLogin: boolean;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

const defaultUserAttributes: (keyof UserAttributes)[] = [
  "id",
  "name",
  "email",
  "contact",
  "isAdmin",
  "isFirstLogin",
  "status",
  "createdAt",
  "updatedAt",
];

const getAllActiveUsers = async (): Promise<UserAttributes[]> => {
  const options: FindOptions = {
    attributes: defaultUserAttributes,
    where: { deleted: 0 },
  };

  return await User.findAll(options) as unknown as UserAttributes[];
};

const findUserById = async (id: number): Promise<UserAttributes | null> => {
  const options: FindOptions = {
    attributes: defaultUserAttributes,
    where: { id, deleted: 0 },
  };

  return await User.findOne(options) as unknown as UserAttributes | null;
};

export { getAllActiveUsers, findUserById };
