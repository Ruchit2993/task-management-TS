import dotenv from "dotenv";
import express from "express";
import requestLogger from "../helper/middlewares/request.logger.ts";
import router from "../route/route.ts"

dotenv.config();

const PORT: Number = Number(process.env.PORT) || 8086;
const app = express();

app.use(express.json())
app.use('/',requestLogger, router);
console.log(PORT);



app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});