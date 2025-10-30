import { StatusMaster, type StatusMasterAttributes } from "./status-master.model.ts";
import type { FindOptions } from "sequelize";

const defaultStatusAttributes: (keyof StatusMasterAttributes)[] = [
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

const getAllActiveStatuses = async (): Promise<StatusMasterAttributes[]> => {
  const options: FindOptions<StatusMasterAttributes> = {
    attributes: defaultStatusAttributes,
    where: { deleted: 0 },
  };

  const results = await StatusMaster.findAll(options);
  return results as StatusMasterAttributes[];
};

const findStatusByIdOrCode = async (
  idOrCode: string | number
): Promise<StatusMasterAttributes | null> => {
  const where: Partial<StatusMasterAttributes> = { deleted: 0 };

  if (!isNaN(Number(idOrCode))) {
    where.id = Number(idOrCode);
  } else {
    where.code = String(idOrCode);
  }

  const options: FindOptions<StatusMasterAttributes> = {
    attributes: defaultStatusAttributes,
    where,
  };

  const result = await StatusMaster.findOne(options);
  return (result as StatusMasterAttributes | null);
};

const statusDbIns = async (
  code: string,
  name: string,
  createdBy: number
): Promise<StatusMasterAttributes> => {
  const newStatus = await StatusMaster.create({
    code,
    name,
    status: 1,
    createdBy,
    deleted: 0,
  });

  return newStatus.toJSON() as StatusMasterAttributes;
};

export { getAllActiveStatuses, findStatusByIdOrCode, statusDbIns };