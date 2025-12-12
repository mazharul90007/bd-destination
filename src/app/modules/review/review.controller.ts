import status from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { reviewService } from "./review.service";
import { IAuthUser } from "../../interfaces/common";
import { ICreateReview } from "./review.interface";
import catchAsync from "../../../shared/catchAsync";

//===================Create Review====================
const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IAuthUser;
  const payload = req.body as ICreateReview;
  const result = await reviewService.createReview(user, payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review has been created successfully",
    data: result,
  });
});

//===================Delete Review====================
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.body.id as string;
  const user = req.user as IAuthUser;
  const result = await reviewService.deleteReview(id, user);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review has been deleted successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
  deleteReview,
};
