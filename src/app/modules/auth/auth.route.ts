import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

//================create user=============
router.post("/signup", authController.createUser);

//================Login user==============
router.post("/login", authController.loginUser);

//=================Refresh Token===========
router.get("/refresh-token", authController.refreshToken);

export const authRoutes = router;
