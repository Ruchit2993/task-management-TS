import { sequelize } from "../../config/dbConnect.js";
import { Task } from "./task.model.js";
import { StatusMaster } from "../status-master/status-master.model.js";
import TeamMember from "../team-member/team-member.model.js";
import Comment from "../comments/comments.model.js";
const defaultTaskttributes = [
    'id',
    'name',
    'description',
    'status',
    'dueDate',
    'createdAt',
    'updatedAt',
];
const defaultStatusAttributes = {
    model: StatusMaster,
    attributes: ['code', 'name'],
    where: { deleted: 0 },
};
/**
 * Get all active (non-deleted) tasks, optionally filtered by status
 */
const getAllActiveTasks = async (status) => {
    const where = { deleted: 0 };
    if (status)
        where.status = status;
    return await Task.findAll({
        attributes: defaultTaskttributes,
        where,
        include: [defaultStatusAttributes],
    });
};
/**
 * Get all tasks by a specific status code
 */
const getTasksByStatusCode = async (status) => {
    return await Task.findAll({
        attributes: defaultTaskttributes,
        where: { status, deleted: 0 },
        include: [defaultStatusAttributes],
    });
};
const getTaskByIdWithStatus = async (id) => {
    return await Task.findOne({
        attributes: defaultTaskttributes,
        where: { id, deleted: 0 },
        include: [defaultStatusAttributes],
    });
};
const isValidStatus = async (code) => {
    const status = await StatusMaster.findOne({ where: { code, deleted: 0 } });
    return !!status;
};
/**
 * Create a new task with team members (transactional)
 */
const createNewTask = async (taskData, teamMembers, createdBy) => {
    return await sequelize.transaction(async (t) => {
        const newTask = await Task.create({
            name: taskData.name,
            description: taskData.description,
            status: taskData.status,
            dueDate: taskData.dueDate,
            createdBy,
            deleted: 0,
        }, { transaction: t });
        if (teamMembers?.length) {
            const teamMemberData = teamMembers.map((userId) => ({
                userId,
                taskId: newTask.id,
                createdBy,
                deleted: 0,
            }));
            await TeamMember.bulkCreate(teamMemberData, { transaction: t });
        }
        return newTask;
    });
};
/**
 * Update an existing task by ID
 */
const updateExistingTask = async (id, updateData) => {
    const task = await Task.findOne({ where: { id, deleted: 0 } });
    if (!task)
        return null;
    await task.update(updateData);
    return task;
};
/**
 * Add a comment to a task
 */
const addTaskComment = async (taskId, userId, comment) => {
    return await Comment.create({
        userId,
        taskId,
        comment,
        createdBy: userId,
        deleted: 0,
    });
};
/**
 * Soft-delete a task (mark as deleted)
 */
const softDeleteTaskById = async (id, deletedBy) => {
    const task = await Task.findOne({ where: { id, deleted: 0 } });
    if (!task)
        return null;
    await task.update({
        deleted: 1,
        deletedAt: new Date(),
        deletedBy,
    });
    return task;
};
export { getTasksByStatusCode, getAllActiveTasks, getTaskByIdWithStatus, isValidStatus, createNewTask, updateExistingTask, addTaskComment, softDeleteTaskById, };
