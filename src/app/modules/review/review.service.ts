import status from "http-status";
import { prisma } from "../../../lib/prisma";
import ApiError from "../../errors/ApiErrors";
import { IAuthUser } from "../../interfaces/common";
import {
  ICreateReview,
  IReviwStatus,
  IUpdateReviewStatus,
} from "./review.interface";
import { UserRole } from "../../../../generated/prisma/enums";

//===================Create Review====================
const createReview = async (user: IAuthUser, payload: ICreateReview) => {
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Unauthorized");
  }
  //find user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  //create review
  const result = await prisma.review.create({
    data: {
      postId: payload.postId,
      userId: userData.id,
      review: payload.review,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
        },
      },
    },
  });

  return result;
};

//===================Delete Review====================
const deleteReview = async (id: string, user: IAuthUser) => {
  //user validation
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "UnAuthorized");
  }
  //find the review
  const reviewData = await prisma.review.findUniqueOrThrow({
    where: { id },
  });

  //user and moderator will can delete only their own review
  if (
    (user.role === UserRole.USER || user.role === UserRole.MODERATOR) &&
    reviewData.userId !== user.id
  ) {
    throw new ApiError(status.FORBIDDEN, "You can only delete your own review");
  }

  //admin and super admin can delete any review
  const result = await prisma.review.delete({
    where: { id },
  });

  return result;
};

//===================Update Review====================
const updateReview = async (user: IAuthUser, payload: IUpdateReviewStatus) => {
  const { id, review } = payload;

  //user validation
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "UnAuthorized");
  }
  //find the review
  const reviewData = await prisma.review.findUniqueOrThrow({
    where: { id },
  });

  //user and moderator will can update only their own review
  if (
    (user.role === UserRole.USER || user.role === UserRole.MODERATOR) &&
    reviewData.userId !== user.id
  ) {
    throw new ApiError(status.FORBIDDEN, "You can only update your own review");
  }

  //admin and super admin can update any review
  const result = await prisma.review.update({
    where: { id },
    data: {
      review,
    },
  });

  return result;
};

//===================Change Review Status====================
const changeReviewStatus = async (payload: IReviwStatus) => {
  const { id, status } = payload;

  //find the review
  const reviewData = await prisma.review.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.review.update({
    where: { id },
    data: { status },
  });

  return result;
};

export const reviewService = {
  createReview,
  deleteReview,
  updateReview,
  changeReviewStatus,
};
