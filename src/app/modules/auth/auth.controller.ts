import { Request, Response } from "express";
import { authService } from "./auth.service";
import { Ifile } from "../../interfaces/file";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

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

export const authController = {
  createUser,
};
