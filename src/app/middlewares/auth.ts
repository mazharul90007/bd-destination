import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiErrors";
import status from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelper";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, "You are not Authorized");
      }

      const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret);
      req.user = verifiedUser;
      console.log(verifiedUser);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(status.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
