import { sequelize } from "../../config/dbConnect.ts";
import { DataTypes, Model } from "sequelize";
// import Task from "./task-model.js";

type StatusMasterAttributes = {
  id: number;
  code: string;
  name: string;
  status: number;
  deleted: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: number;
  updatedBy: number;
  deletedBy: number;
}

class StatusMaster extends Model<StatusMasterAttributes> implements StatusMasterAttributes {
  declare id: number;
  declare code: string;
  declare name: string;
  declare status: number;
  declare deleted: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
  declare createdBy: number;
  declare updatedBy: number;
  declare deletedBy: number;
}

StatusMaster.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "TO_DO",
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "To Do",
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
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
    modelName: "StatusMaster",
    tableName: "status_master",
    timestamps: true,
    underscored: true,
    paranoid: false,
    indexes: [
      { unique: true, fields: ["code"] }
    ]
  }
);

export default StatusMaster;