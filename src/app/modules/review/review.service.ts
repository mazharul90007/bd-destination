import status from "http-status";
import { prisma } from "../../../lib/prisma";
import ApiError from "../../errors/ApiErrors";
import { IAuthUser } from "../../interfaces/common";
import { ICreateReview } from "./review.interface";

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

export const reviewService = {
  createReview,
};
