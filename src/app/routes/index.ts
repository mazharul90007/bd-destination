import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { postRouts } from "../modules/post/post.routes";
import { userRoutes } from "../modules/user/user.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/post",
    route: postRouts,
  },
  {
    path: "/user",
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
