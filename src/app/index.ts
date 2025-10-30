import dotenv from "dotenv";
import express from "express";
import router from "../route/route.ts"
import { Log } from "../helper/middlewares/request.logger.ts";
import { sequelize, testConnection } from "../config/dbConnect.ts";
// import User from "../modules/user/user.model.ts";
// import Comment from "../modules/comments/comments.model.ts";
// import TeamMember from "../modules/team-member/team-member.model.ts";
// import StatusMaster from "../modules/status-master/status-master.model.ts";
// import Task from "../modules/task/task.model.ts";

import cors from 'cors';
dotenv.config();

const PORT: Number = Number(process.env.PORT) || 8086;
const app = express();

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use('/', new Log().requestLogger, router);
console.log(PORT);

await testConnection();
// await User.sync({alter:true});
// await Comment.sync({alter:true});
// await TeamMember.sync({alter:true});
// await StatusMaster.sync({alter:true});
// await Task.sync({alter:true});
// await sequelize.sync({alter: true});     
await sequelize.sync({alter: true}); 

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});