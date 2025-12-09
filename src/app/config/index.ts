import dotenv from "dotenv";
import type { Secret } from "jsonwebtoken";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  cloudinary: {
    cloudinary_api: process.env.CLOUDINARY_API as string,
    cloudinary_secret: process.env.CLOUDINARY_SECRET as string,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET as Secret,

    expires_in: process.env.EXPIRES_IN as unknown,

    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as Secret,

    refresh_token_expires_in: process.env
      .REFRESH_TOKEN_SECRET_EXPIRES_IN as unknown,
  },
};
