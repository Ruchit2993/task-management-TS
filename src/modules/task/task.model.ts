import { sequelize } from "../../config/dbConnect.ts";
import { DataTypes, Model, Optional } from "sequelize";
import {User} from "../user/user.model.ts";
import TeamMember from "../team-member/team-member.model.ts";
import {StatusMaster} from "../status-master/status-master.model.ts";
import Comment from "../comments/comments.model.ts";

type TaskAttributes = {
  id: number;
  name: string;
  description?: string;
  status: string;
  dueDate?: Date;
  deleted: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
  deletedBy: number | null;

}

type TaskCreationAttributes = Optional<TaskAttributes,
  "id" | "deleted" | "createdAt" | "updatedAt" | "deletedAt" | "createdBy" | "updatedBy" | "deletedBy">;


class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  declare id: number;
  declare name: string;
  declare description: string;
  declare status: string;
  declare dueDate: Date;
  declare deleted: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
  declare createdBy: number | null;
  declare updatedBy: number | null;
  declare deletedBy: number | null;
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

Task.belongsTo(StatusMaster, { foreignKey: "status", targetKey: "code" });
StatusMaster.hasMany(Task, { foreignKey: "status", sourceKey: "code" });
Task.hasMany(Comment, { foreignKey: "taskId" });

Comment.belongsTo(Task, { foreignKey: "taskId" });

export {Task};
export type {TaskAttributes}