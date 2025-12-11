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

export const reviewRoutes = router;
