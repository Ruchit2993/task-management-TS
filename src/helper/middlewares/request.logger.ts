import { Request, Response, NextFunction } from "express";

export default function requestLogger(req: Request , res: Response, next:NextFunction) {
    res.on("finish", () => {
        console.log(`${req.ip}: ${req.method}: ${req.path}: ${res.statusCode}`);
    });
    next();
}
