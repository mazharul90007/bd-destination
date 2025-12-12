import express from "express";
import { reviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";

const router = express.Router();

//===================Create Review====================
router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER),
  reviewController.createReview
);

//===================Delete Review====================
router.delete(
  "/delete-review",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER),
  reviewController.deleteReview
);

//===================Update Review====================
router.patch(
  "/update-review",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER),
  reviewController.updateReview
);

//===================Change Review Status====================
router.patch(
  "/change-status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  reviewController.changeReviewStatus
);

export const reviewRoutes = router;
