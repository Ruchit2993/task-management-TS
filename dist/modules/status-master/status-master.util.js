import { StatusMaster } from "./status-master.model.js";
const defaultStatusAttributes = [
    "id",
    "code",
    "name",
    "status",
    "createdAt",
    "updatedAt",
    "deleted",
    "createdBy",
    "updatedBy",
];
const getAllActiveStatuses = async () => {
    const options = {
        attributes: defaultStatusAttributes,
        where: { deleted: 0 },
    };
    const results = await StatusMaster.findAll(options);
    return results;
};
const findStatusByIdOrCode = async (idOrCode) => {
    const where = { deleted: 0 };
    if (!isNaN(Number(idOrCode))) {
        where.id = Number(idOrCode);
    }
    else {
        where.code = String(idOrCode);
    }
    const options = {
        attributes: defaultStatusAttributes,
        where,
    };
    const result = await StatusMaster.findOne(options);
    return result;
};
const statusDbIns = async (code, name, createdBy) => {
    const newStatus = await StatusMaster.create({
        code,
        name,
        status: 1,
        createdBy,
        deleted: 0,
    });
    return newStatus.toJSON();
};
export { getAllActiveStatuses, findStatusByIdOrCode, statusDbIns };
