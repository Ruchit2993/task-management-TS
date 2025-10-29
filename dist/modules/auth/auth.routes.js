import { Router } from "express";
import { verifyToken } from "../../helper/middlewares/auth.middleware.js";
import { register, login, changePassword, firstChangePassword, forgotPassword, resetPassword, } from "../auth/auth.controller.js";
const router = Router();
// Define routes with controller handlers
router.post("/register", register);
router.post("/login", login);
router.post("/change-pass", verifyToken, changePassword);
router.post("/first-change-pass", verifyToken, firstChangePassword);
router.post("/forgot-pass", forgotPassword);
router.post("/reset-pass", resetPassword);
export default router;
