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
};
