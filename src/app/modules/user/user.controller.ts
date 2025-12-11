import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import { Request, Response } from "express";
import { userFilterAbleFields } from "./user.constants";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interfaces/common";
import { Ifile } from "../../interfaces/file";
import { IUserStatus } from "./user.interface";

//===================Get All Users===================
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await userService.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User data fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

//===================Get User Profile===================
const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = req.user as IAuthUser;
  const result = await userService.getUserProfile(id, user);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User data fetched successfully",
    data: result,
  });
});

//===================Update User Data===================
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = req.user as IAuthUser;
  const payload = req.body;
  const file = req.file as Ifile;
  const result = await userService.updateUser(id, user, payload, file);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User data updated successfully",
    data: result,
  });
});

//===================Update User Status===================
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = req.user as IAuthUser;
  const payload = req.body as IUserStatus;
  const result = await userService.updateUserStatus(id, user, payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User data deleted successfully",
    data: result,
  });
});

export const userController = {
  getAllUsers,
  getUserProfile,
  updateUser,
  updateUserStatus,
};
