import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { postService } from "./post.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { IAuthUser } from "../../interfaces/common";
import { Ifile } from "../../interfaces/file";
import pick from "../../../shared/pick";
import { postFilterableFields } from "./post.constants";

//========================Create Post======================
const createPost = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;
  const file = req.file as Ifile;
  const result = await postService.createPost(payload, user as IAuthUser, file);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post has been created successfully",
    data: result,
  });
});

//========================Get All Post======================
const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, postFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await postService.getAllPosts(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

//========================Get All Active Post======================
const getAllActivePosts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, postFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await postService.getAllActivePosts(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

//====================Get Post by Id====================
const getPostById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await postService.getPostById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post fetched successfully",
    data: result,
  });
});

//===================Update Post====================
const updatePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = req.user as IAuthUser;
  const payload = req.body;
  const file = req.file as Ifile;
  const result = await postService.updatePost(id, user, payload, file);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post has been updated successfully",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPosts,
  getAllActivePosts,
  getPostById,
  updatePost,
};
