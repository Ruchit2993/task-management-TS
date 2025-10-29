import { sequelize } from "../../config/dbConnect.ts";
import { DataTypes, Model, Optional } from "sequelize";

type CommentAttributes = {
  id: number;
  userId: number;
  taskId: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: number;
  createdBy: number | null;
  updatedBy: number | null;
}

type CommentCreationAttributes = Optional<CommentAttributes,
  "id" | "createdAt" | "updatedAt" | "deleted" | "createdBy" | "updatedBy">;

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  declare id: number;
  declare userId: number;
  declare taskId: number;
  declare comment: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deleted: number;
  declare createdBy: number | null;
  declare updatedBy: number | null;
}

Comment.init(
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
      references: {
        model: "users",
        key: "id",
      },
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
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
    modelName: "Comment",
    tableName: "comments",
    timestamps: true,
    underscored: true,
    paranoid: false,
  }
);


export default Comment;
