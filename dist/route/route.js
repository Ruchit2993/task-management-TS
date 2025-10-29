import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
// import type { Request, Response, NextFunction } from "express";
const router = express.Router();
router.get("/greet", (req, res) => {
    res.json({ Greet: "Hello.........." });
});
router.use("/auth", authRoutes);
export default router;
