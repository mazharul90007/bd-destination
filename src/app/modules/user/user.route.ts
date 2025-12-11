import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { fileUploadrer } from "../../../helpers/fileUpload";
import { userValidation } from "./user.validation";

const router = express.Router();
//===================Get All Users===================
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getAllUsers
);

//===================Get User Profile===================
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR),
  userController.getUserProfile
);

//===================Update User Data===================
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR),
  fileUploadrer.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.updateUser.parse(JSON.parse(req.body.data));
    return userController.updateUser(req, res, next);
  }
);

export const userRoutes = router;
