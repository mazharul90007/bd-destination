import status from "http-status";
import { fileUploadrer } from "../../../helpers/fileUpload";
import { prisma } from "../../../lib/prisma";
import ApiError from "../../errors/ApiErrors";
import { IAuthUser } from "../../interfaces/common";
import { Ifile } from "../../interfaces/file";
import { Ipost, IPostFilterRequest } from "./post.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import calculatePagination from "../../../helpers/paginationHelpers";
import {
  PostStatus,
  Prisma,
  UserRole,
} from "../../../../generated/prisma/client";
import { postSearchableFields } from "./post.constants";

//========================Create Post======================
const createPost = async (payload: Ipost, user: IAuthUser, file?: Ifile) => {
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Unauthorized");
  }
  if (file) {
    const uploadToCloudinary = await fileUploadrer.uploadToCloudinary(file);
    payload.photoUrl = uploadToCloudinary?.secure_url;
    payload.photoUrlPublicId = uploadToCloudinary?.public_id;
  }

  const result = await prisma.post.create({
    data: {
      authorId: user?.id,
      ...payload,
      description: payload.description as any,
    },
  });

  return result;
};

//========================Get All Post======================
const getAllPosts = async (
  filters: IPostFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: postSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereCondition: Prisma.PostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.post.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          role: true,
        },
      },
      reviews: {
        where: { status: PostStatus.ACTIVE },
        select: {
          id: true,
          userId: true,
          review: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              name: true,
              profilePhoto: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.post.count({
    where: whereCondition,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

//========================Get All Active Post======================
const getAllActivePosts = async (
  filters: IPostFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: postSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  andConditions.push({ status: PostStatus.ACTIVE });

  const whereCondition: Prisma.PostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.post.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          profilePhoto: true,
          email: true,
          role: true,
        },
      },
      reviews: {
        where: { status: PostStatus.ACTIVE },
        select: {
          id: true,
          userId: true,
          review: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              name: true,
              profilePhoto: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.post.count({
    where: whereCondition,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

//====================Get Post by Id====================
const getPostById = async (id: string) => {
  const result = await prisma.post.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          profilePhoto: true,
          email: true,
          role: true,
        },
      },
      reviews: {
        where: { status: PostStatus.ACTIVE },
        select: {
          id: true,
          userId: true,
          review: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              name: true,
              profilePhoto: true,
            },
          },
        },
      },
    },
  });

  return result;
};

//===================Update Post====================
const updatePost = async (
  id: string,
  user: IAuthUser,
  payload: any,
  file: Ifile
) => {
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Unauthorized");
  }

  //get the post.
  const existingPost = await prisma.post.findUniqueOrThrow({
    where: { id },
    select: { authorId: true, photoUrl: true, photoUrlPublicId: true },
  });

  //check if user is Moderator
  if (user.role === UserRole.MODERATOR) {
    if (existingPost.authorId !== user.id) {
      throw new ApiError(
        status.FORBIDDEN,
        "You can only update your own posts"
      );
    }
  }

  //Upload new Photo
  if (file) {
    //upload new photo to cloudinary
    const uploadToCloudinary = await fileUploadrer.uploadToCloudinary(file);
    payload.photoUrl = uploadToCloudinary?.secure_url;
    payload.photoUrlPublicId = uploadToCloudinary?.public_id;

    //delete old photo from cloudinary
    if (existingPost.photoUrlPublicId) {
      try {
        await fileUploadrer.deleteFromCloudinary(existingPost.photoUrlPublicId);
      } catch (error) {
        console.error("Failed to delete old photos: ", error);
      }
    }
  }

  //remove undefined values
  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) delete payload[key];
  });

  //update data
  const result = await prisma.post.update({
    where: { id },
    data: {
      ...payload,
      description: payload.description as any,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return result;
};

//===================Delete Post====================
const deletePost = async (id: string) => {
  const result = await prisma.post.delete({
    where: { id },
  });

  return result;
};

export const postService = {
  createPost,
  getAllPosts,
  getAllActivePosts,
  getPostById,
  updatePost,
  deletePost,
};
