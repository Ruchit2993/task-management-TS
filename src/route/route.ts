import express, {Request, Response} from "express";

const router = express.Router();

router.get("/greet", (req: Request, res: Response ) => {
  res.json({ Greet: "Hello.........." });
});

export default router;