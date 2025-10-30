import express,{type Request, type Response,type NextFunction } from "express";
import authRoutes from "../modules/auth/auth.routes.ts";
import userRoutes from "../modules/user/user.routes.ts"
import statusRoutes from "../modules/status-master/status.routes.ts"
import taskRoutes from "../modules/task/task.routes.ts"

const router = express.Router();

router.get("/greet", (req: Request, res: Response ) => {
  res.json({ Greet: "Hello.........." });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/status", statusRoutes);
router.use("/tasks", taskRoutes);

export default router;