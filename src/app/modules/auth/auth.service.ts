import { Secret } from "jsonwebtoken";
import { UserStatus } from "../../../../generated/prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelper";
import { prisma } from "../../../lib/prisma";
import config from "../../config";
import { ICreateUser, ILogin } from "./auth.inteface";
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

  const accessToken = jwtHelpers.generateToken(
    {
      email: result.email,
      role: result.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as number
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: result.email,
      role: result.role,
    },
    config.jwt.refresh_token_secret,
    config.jwt.refresh_token_expires_in as number
  );

  const { password: _password, ...userWithoutPassword } = result;

  return {
    userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

//=======================Login User=================
const loginUser = async (payload: ILogin) => {
  //find user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  //verify password
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Login Credentials are incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as number
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret,
    config.jwt.refresh_token_expires_in as number
  );

  return {
    accessToken,
    refreshToken,
  };
};

//========================Refresh Token=================
const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret
    );

    // console.log(decodedData);
  } catch (error) {
    throw new Error("Your are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret,
    config.jwt.expires_in as number
  );

  return {
    accessToken,
  };
};

export const authService = {
  createUser,
  loginUser,
  refreshToken,
};
