import express,{type Request, type Response,type NextFunction } from "express";
import authRoutes from "../modules/auth/auth.routes.ts";
// import type { Request, Response, NextFunction } from "express";
import userRoutes from "../modules/user/user.routes.ts"
const router = express.Router();

router.get("/greet", (req: Request, res: Response ) => {
  res.json({ Greet: "Hello.........." });
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
export default router;