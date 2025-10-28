import dotenv from "dotenv";
import express from "express";
import router from "../route/route.ts"
import { Log } from "../helper/middlewares/request.logger.ts";
import { testConnection } from "../config/dbConnect.ts";
import User from "../modules/user/user.model.ts";

dotenv.config();

const PORT: Number = Number(process.env.PORT) || 8086;
const app = express();

app.use(express.json())
app.use('/', new Log().requestLogger, router);
console.log(PORT);

await testConnection();
await User.sync({alter:true});

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});