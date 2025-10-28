import dotenv from "dotenv";
// import express, { Request, Response } from "express";
import express from "express";
import requestLogger from "../helper/middlewares/request.logger.js";
dotenv.config();
const PORT = Number(process.env.PORT) || 8086;
const app = express();
app.use(express.json());
console.log(PORT);
app.get("/", requestLogger, (req, res) => {
    res.json({ Greet: "Hello.........." });
});
app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});
//# sourceMappingURL=index.js.map