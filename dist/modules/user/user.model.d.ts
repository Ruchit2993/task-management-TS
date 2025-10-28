import { Model } from "sequelize";
type UserAttributes = {
    id: number;
    name: string;
    email: string;
    contact: string;
    password: string;
    isAdmin: number;
    isFirstLogin: number;
    status: number;
    deleted: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
};
declare class User extends Model<UserAttributes> implements UserAttributes {
    id: number;
    name: string;
    email: string;
    contact: string;
    password: string;
    isAdmin: number;
    isFirstLogin: number;
    status: number;
    deleted: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}
export default User;
//# sourceMappingURL=user.model.d.ts.map