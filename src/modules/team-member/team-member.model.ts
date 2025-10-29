import { sequelize } from "../../config/dbConnect.ts";
import { DataTypes, Model, Optional } from "sequelize";
// import Task from "../task/task.model.js";

type TeamMemberAttributes = {
  id: number;
  userId: number;
  taskId: number;
  createdAt: Date;
  deleted: number;
  updatedAt: Date;
  createdBy: number | null;
  updatedBy: number | null;

}

type TeamMemberCreationAttributes = Optional<TeamMemberAttributes,
  "id" | "createdAt" | "updatedAt" | "deleted" | "createdBy" | "updatedBy">;


class TeamMember extends Model<TeamMemberAttributes, TeamMemberCreationAttributes> implements TeamMemberAttributes {
  declare id: number;
  declare userId: number;
  declare taskId: number;
  declare createdAt: Date;
  declare deleted: number;
  declare updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;

}

TeamMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TeamMember",
    tableName: "team_member",
    timestamps: true,
    underscored: true,
    paranoid: false,
  }
);

// Task.hasMany(TeamMember, { foreignKey: "taskId" });


export default TeamMember;
