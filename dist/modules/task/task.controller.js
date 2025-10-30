import { Task } from "./task.model.js";
// import { StatusMaster } from '../status-master/status-master.model.js';
// import TeamMember from '../team-member/team-member.model.js';
import { User } from "../user/user.model.js";
// import Comment from '../comments/comments.model.js';
import messages from "../../helper/constants/messages.js";
import ResponseBuilder from "../../helper/responce-builder/responseBuilder.js";
import { validateTask, validateTaskUpdate, validateTaskPatch } from "./task.validation.js";
import { getAllActiveTasks, getTaskByIdWithStatus, getTasksByStatusCode, isValidStatus, createNewTask, updateExistingTask, addTaskComment, softDeleteTaskById } from "./task.util.js";
const getAllTasks = async (req, res) => {
    try {
        const { status } = req.query;
        const tasks = await getAllActiveTasks(status);
        ResponseBuilder.success(res, 200, messages.SUCCESS.TASK_RETRIEVED, { tasks });
    }
    catch (error) {
        ResponseBuilder.error(res, 500, messages.ERROR.SERVER_ERROR, error.message);
    }
};
const getTasksByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const tasks = await getTasksByStatusCode(status);
        if (!tasks.length) {
            ResponseBuilder.error(res, 404, messages.ERROR.TASK_NOT_FOUND);
            return;
        }
        ResponseBuilder.success(res, 200, messages.SUCCESS.TASK_RETRIEVED, { tasks });
    }
    catch (error) {
        ResponseBuilder.error(res, 500, messages.ERROR.SERVER_ERROR, error.message);
    }
};
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await getTaskByIdWithStatus(Number(id));
        if (!task) {
            ResponseBuilder.error(res, 404, messages.ERROR.TASK_NOT_FOUND);
            return;
        }
        ResponseBuilder.success(res, 200, messages.SUCCESS.TASK_RETRIEVED, { task });
    }
    catch (error) {
        ResponseBuilder.error(res, 500, messages.ERROR.SERVER_ERROR, error.message);
    }
};
const createTask = async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) {
        ResponseBuilder.error(res, 400, messages.ERROR.VALIDATION_ERROR, error.details[0].message);
        return;
    }
    try {
        const { name, description, due_date, status, teamMembers } = req.body;
        const taskStatus = status || 'TO_DO';
        const statusExists = await isValidStatus(taskStatus);
        if (!statusExists) {
            ResponseBuilder.error(res, 400, messages.ERROR.INVALID_STATUS);
            return;
        }
        if (Array.isArray(teamMembers) && teamMembers.length > 0) {
            const users = await User.findAll({ where: { id: teamMembers, deleted: 0 } });
            if (users.length !== teamMembers.length) {
                ResponseBuilder.error(res, 400, messages.ERROR.INVALID_TEAM_MEMBERS);
                return;
            }
        }
        const task = await createNewTask({ name, description, status: taskStatus, dueDate: due_date }, teamMembers, req.user.id);
        ResponseBuilder.success(res, 201, messages.SUCCESS.TASK_CREATED, { task });
    }
    catch (error) {
        ResponseBuilder.error(res, 500, messages.ERROR.SERVER_ERROR, error.message);
    }
};
const updateTask = async (req, res) => {
    const { error } = validateTaskUpdate(req.body);
    if (error) {
        ResponseBuilder.error(res, 400, messages.ERROR.VALIDATION_ERROR, error.details[0].message);
        return;
    }
    try {
        const { id } = req.params;
        const { name, description, status, due_date } = req.body;
        if (status && !(await isValidStatus(status))) {
            ResponseBuilder.error(res, 400, messages.ERROR.INVALID_STATUS);
            return;
        }
        const updateData = {
            name,
            description: description || null,
            status,
            dueDate: due_date,
            updatedBy: req.user.id,
        };
        const task = await updateExistingTask(Number(id), updateData);
        if (!task) {
            ResponseBuilder.error(res, 404, messages.ERROR.TASK_NOT_FOUND);
            return;
        }
        ResponseBuilder.success(res, 200, messages.SUCCESS.TASK_UPDATED, { task });
    }
    catch (error) {
        ResponseBuilder.error(res, 500, messages.ERROR.SERVER_ERROR, error.message);
    }
};
const patchTask = async (req, res) => {
    const { id } = req.params;
    const { error } = validateTaskPatch(req.body, req.user.isAdmin ? 1 : 0);
    if (error) {
        ResponseBuilder.error(res, 400, messages.ERROR.VALIDATION_ERROR, error.details[0].message);
        return;
    }
    const { name, description, status, due_date, comment } = req.body;
    try {
        const task = await Task.findOne({ where: { id, deleted: 0 } });
        if (!task) {
            ResponseBuilder.error(res, 404, messages.ERROR.TASK_NOT_FOUND);
            return;
        }
        if (req.user.isAdmin) {
            if (comment) {
                ResponseBuilder.error(res, 400, messages.ERROR.ADMIN_COMMENT_NOT_ALLOWED);
                return;
            }
            if (status && !(await isValidStatus(status))) {
                ResponseBuilder.error(res, 400, messages.ERROR.INVALID_STATUS);
                return;
            }
            const updateData = { updatedBy: req.user.id };
            if (name)
                updateData.name = name;
            if (description !== undefined)
                updateData.description = description;
            if (status)
                updateData.status = status;
            if (due_date)
                updateData.dueDate = due_date;
            if (Object.keys(updateData).length > 1) {
                await task.update(updateData);
            }
            ResponseBuilder.success(res, 200, messages.SUCCESS.TASK_UPDATED, { task });
        }
        else {
            // Non-admin: allow only status/comment
            if (name || description !== undefined || due_date) {
                ResponseBuilder.error(res, 400, messages.ERROR.NON_ADMIN_TASK_FIELDS_NOT_ALLOWED);
                return;
            }
            if (status && !comment) {
                ResponseBuilder.error(res, 400, messages.ERROR.COMMENT_REQUIRED_FOR_STATUS, 'Comment is required when updating status for non-admin users');
                return;
            }
            const updates = [];
            if (status) {
                if (!(await isValidStatus(status))) {
                    ResponseBuilder.error(res, 400, messages.ERROR.INVALID_STATUS);
                    return;
                }
                await task.update({ status, updatedBy: req.user.id });
                updates.push('status');
            }
            if (comment) {
                await addTaskComment(Number(id), req.user.id, comment);
                updates.push('comment');
            }
            ResponseBuilder.success(res, 200, updates.includes('status')
                ? messages.SUCCESS.TASK_UPDATED
                : messages.SUCCESS.COMMENT_ADDED, { task });
        }
    }
    catch (error) {
        ResponseBuilder.error(res, 500, messages.ERROR.SERVER_ERROR, error.message);
    }
};
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id, deleted: 0 } });
        if (!task) {
            ResponseBuilder.error(res, 404, messages.ERROR.TASK_NOT_FOUND);
            return;
        }
        const deleted = await softDeleteTaskById(Number(id), req.user.id);
        if (!deleted) {
            ResponseBuilder.error(res, 404, messages.ERROR.TASK_NOT_FOUND);
            return;
        }
        ResponseBuilder.success(res, 200, messages.SUCCESS.TASK_DELETED);
    }
    catch (error) {
        ResponseBuilder.error(res, 500, messages.ERROR.SERVER_ERROR, error.message);
    }
};
export { getAllTasks, getTasksByStatus, getTaskById, createTask, updateTask, patchTask, deleteTask, };
