import express from "express";
// import type { Request, Response, NextFunction } from "express";
const router = express.Router();
router.get("/greet", (req, res) => {
    res.json({ Greet: "Hello.........." });
});
export default router;
