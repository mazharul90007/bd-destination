import { prisma } from "../../../lib/prisma";
import { Ifile } from "../../interfaces/file";
import { ICreateUser } from "./auth.inteface";
import * as bcrypt from "bcrypt";

//=======================Create User=================
const createUser = async (payload: ICreateUser) => {
  const { name, email, password } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email,
    password: hashedPassword,
  };

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};

export const authService = {
  createUser,
};
