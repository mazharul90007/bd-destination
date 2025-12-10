import express, { NextFunction, Request, Response } from "express";
import { postController } from "./post.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { fileUploadrer } from "../../../helpers/fileUpload";
import { postValidation } from "./post.validation";
const router = express.Router();

//===============Create Post==================
router.post(
  "/",
  auth(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploadrer.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = postValidation.createPost.parse(JSON.parse(req.body.data));
    return postController.createPost(req, res, next);
  }
);

//============Get All Posts==================
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  postController.getAllPosts
);

//============Get All Active Posts==================
router.get("/active", postController.getAllActivePosts);

//====================Get Post by Id====================
router.get("/:id", postController.getPostById);

//===================Update Post====================
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR),
  fileUploadrer.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = postValidation.updatePost.parse(JSON.parse(req.body.data));
    return postController.updatePost(req, res, next);
  }
);

export const postRouts = router;
