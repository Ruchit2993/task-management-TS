import express from "express";
import { RequestHandler } from 'express';
import {getAllTasks, getTasksByStatus, getTaskById, createTask, updateTask, patchTask, deleteTask } from "./task.controller.ts";
import { verifyToken, isAdmin } from "../../helper/middlewares/auth.middleware.ts";

const router = express.Router();

router.get("/", verifyToken, getAllTasks);
// router.get("/", verifyToken, getTasksByQuery); // this Route is for Query-based filtering done in the above route    
router.get("/status/:status", verifyToken, getTasksByStatus);
router.get("/:id", verifyToken, getTaskById);

router.post("/", verifyToken, isAdmin, createTask as RequestHandler);
router.put("/:id", verifyToken, isAdmin, updateTask as RequestHandler);
router.patch("/:id", verifyToken, patchTask as RequestHandler); 
router.delete("/:id", verifyToken, isAdmin, deleteTask as RequestHandler);



export default router;
