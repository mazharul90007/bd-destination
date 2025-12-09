import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

//================create user=============
router.post("/signup", authController.createUser);

export const authRoutes = router;
