import { Request, Response } from "express";
import { authService } from "./auth.service";
import { Ifile } from "../../interfaces/file";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { ILogin } from "./auth.inteface";

//=======================Create User=================
const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.createUser(payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Registration Successful!",
    data: result,
  });
});

//=======================Login User=================
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body as ILogin;
  const result = await authService.loginUser(payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Login Successful!",
    data: result,
  });
});

//======================Refresh Token=====================

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token generated successfully",
    data: result,
  });
});

export const authController = {
  createUser,
  loginUser,
  refreshToken,
};
