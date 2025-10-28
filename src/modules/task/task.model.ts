import { sequelize } from "../../config/dbConnect.ts";
import { DataTypes, Model } from "sequelize";
// import User from "./user-model.js";
// import TeamMember from "./team-member-model.js";
// import StatusMaster from "../status-master/status-master.model.ts";
// import Comment from "../comments/comments.model.ts";

type TaskAttributes = {
  id: number;
  name: string;
  description: string;
  status: number;
  dueDate: Date;
  deleted: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;

}

class Task extends Model<TaskAttributes> implements TaskAttributes {
  declare id: number;
  declare name: string;
  declare description: string;
  declare status: number;
  declare dueDate: Date;
  declare deleted: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
  declare createdBy: number;
  declare updatedBy: number;
  declare deletedBy: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
    underscored: true,
    paranoid: false,
  }
);

// Task.belongsTo(StatusMaster, { foreignKey: "status", targetKey: "code" });
// StatusMaster.hasMany(Task, { foreignKey: "status", sourceKey: "code" });
// Task.hasMany(Comment, { foreignKey: "taskId" });

// Comment.belongsTo(Task, { foreignKey: "taskId" });

export default Task;