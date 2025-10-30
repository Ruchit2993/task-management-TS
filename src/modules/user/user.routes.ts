import express, { Router } from "express";
import { getAllUsers, getUserById, updateUser, patchUser, deleteUser } from "./user.controller.ts";
import { verifyToken, isAdmin } from "../../helper/middlewares/auth.middleware.ts";
import { register } from "../auth/auth.controller.ts";

const router: Router = express.Router();

router.get("/", verifyToken, isAdmin, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken, isAdmin, register);
router.put("/:id", verifyToken, isAdmin, updateUser);
router.patch("/:id", verifyToken, isAdmin, patchUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
