import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
// import type { Request, Response, NextFunction } from "express";
import userRoutes from "../modules/user/user.routes.js";
const router = express.Router();
router.get("/greet", (req, res) => {
    res.json({ Greet: "Hello.........." });
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
export default router;
