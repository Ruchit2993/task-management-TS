import { User } from "./user.model.js";
const defaultUserAttributes = [
    "id",
    "name",
    "email",
    "contact",
    "isAdmin",
    "isFirstLogin",
    "status",
    "createdAt",
    "updatedAt",
];
const getAllActiveUsers = async () => {
    const options = {
        attributes: defaultUserAttributes,
        where: { deleted: 0 },
    };
    return await User.findAll(options);
};
const findUserById = async (id) => {
    const options = {
        attributes: defaultUserAttributes,
        where: { id, deleted: 0 },
    };
    return await User.findOne(options);
};
export { getAllActiveUsers, findUserById };
