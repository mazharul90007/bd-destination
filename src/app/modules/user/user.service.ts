import status from "http-status";
import {
  Prisma,
  UserRole,
  UserStatus,
} from "../../../../generated/prisma/client";
import calculatePagination from "../../../helpers/paginationHelpers";
import { prisma } from "../../../lib/prisma";
import ApiError from "../../errors/ApiErrors";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { userSearchAbleFields } from "./user.constants";
import { IUserFilterRequest, IUserStatus } from "./user.interface";
import { Ifile } from "../../interfaces/file";
import { fileUploadrer } from "../../../helpers/fileUpload";

//===================Get All Users===================
const getAllUsers = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filteredData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: { contains: filters.searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (Object.keys(filteredData).length > 0) {
    andConditions.push({
      AND: Object.keys(filteredData).map((key) => ({
        [key]: {
          equals: (filteredData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput = { AND: andConditions };

  const result = await prisma.user.findMany({
    where: whereCondition,
    skip: skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      status: true,
      needRoleChange: true,
    },
  });

  const total = await prisma.user.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//===================Get User Profile===================
const getUserProfile = async (id: string, user: IAuthUser) => {
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Unauthorized");
  }

  //find user
  const userData = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      phone: true,
      address: true,
    },
  });

  if (user.role === UserRole.MODERATOR && userData.id !== user.id) {
    throw new ApiError(
      status.FORBIDDEN,
      "You are not authorized to access this data"
    );
  }

  return userData;
};

//===================Update User Data===================
const updateUser = async (
  id: string,
  user: IAuthUser,
  payload: any,
  file: Ifile
) => {
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Unauthorized");
  }

  //get the user.
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      profilePhoto: true,
      profilePhotoUrlPublicId: true,
    },
  });

  //check if user is Moderator
  if (user.role === UserRole.MODERATOR) {
    if (existingUser.id !== user.id) {
      throw new ApiError(
        status.FORBIDDEN,
        "You can only update your own profile"
      );
    }
  }

  //Upload new Photo
  if (file) {
    //upload new photo to cloudinary
    const uploadToCloudinary = await fileUploadrer.uploadToCloudinary(file);
    payload.profilePhoto = uploadToCloudinary?.secure_url;
    payload.profilePhotoUrlPublicId = uploadToCloudinary?.public_id;

    //delete old photo from cloudinary
    if (existingUser.profilePhotoUrlPublicId) {
      try {
        await fileUploadrer.deleteFromCloudinary(
          existingUser.profilePhotoUrlPublicId
        );
      } catch (error) {
        console.error("Failed to delete old photos: ", error);
      }
    }
  }

  //remove undefined values
  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) delete payload[key];
  });

  //Update User Data
  const result = await prisma.user.update({
    where: { id },
    data: {
      ...payload,
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      phone: true,
      address: true,
    },
  });

  return result;
};

//===================Update Status===================
const updateUserStatus = async (
  id: string,
  user: IAuthUser,
  payload: IUserStatus
) => {
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Unauthorized");
  }

  //get the user.
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  //check if user is Moderator
  if (user.role === UserRole.MODERATOR) {
    if (existingUser.id !== user.id) {
      throw new ApiError(
        status.FORBIDDEN,
        "You can only delete your own profile"
      );
    }
  }

  //Update User status
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: payload.status,
    },
  });
};

export const userService = {
  getAllUsers,
  getUserProfile,
  updateUser,
  updateUserStatus,
};
