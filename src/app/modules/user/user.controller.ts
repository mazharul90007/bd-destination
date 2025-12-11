import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import { Request, Response } from "express";
import { userFilterAbleFields } from "./user.constants";
import pick from "../../../shared/pick";

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

export const userController = {
  getAllUsers,
};
