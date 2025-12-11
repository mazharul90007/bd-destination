import status from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { reviewService } from "./review.service";
import { IAuthUser } from "../../interfaces/common";
import { ICreateReview } from "./review.interface";

//===================Create Review====================
const createReview = async (req: Request, res: Response) => {
  const user = req.user as IAuthUser;
  const payload = req.body as ICreateReview;
  const result = await reviewService.createReview(user, payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review has been created successfully",
    data: result,
  });
};

export const reviewController = {
  createReview,
};
