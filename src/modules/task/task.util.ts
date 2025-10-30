import { Transaction } from 'sequelize';
import { sequelize } from '../../config/dbConnect.ts';
import {Task} from './task.model.ts';
import type { TaskAttributes } from './task.model.ts';
import {StatusMaster} from '../status-master/status-master.model.ts';
import TeamMember from '../team-member/team-member.model.ts';
import {User} from '../user/user.model.ts';
import Comment from '../comments/comments.model.ts';


interface TaskCreateInput {
  name: string;
  description?: string;
  status: string;
  dueDate?: Date;
}

interface UpdateTaskInput {
  name?: string;
  description?: string;
  status?: string;
  dueDate?: Date;
}

const defaultTaskttributes: Array<keyof TaskAttributes> = [
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
const getAllActiveTasks = async (status?: string) => {
  const where: Record<string, any> = { deleted: 0 };
  if (status) where.status = status;

  return await Task.findAll({
    attributes: defaultTaskttributes,
    where,
    include: [defaultStatusAttributes],
  });
};

/**
 * Get all tasks by a specific status code
 */
const getTasksByStatusCode = async (status: string) => {
  return await Task.findAll({
    attributes: defaultTaskttributes,
    where: { status, deleted: 0 },
    include: [defaultStatusAttributes],
  });
};

const getTaskByIdWithStatus = async (id: number) => {
  return await Task.findOne({
    attributes: defaultTaskttributes,
    where: { id, deleted: 0 },
    include: [defaultStatusAttributes],
  });
};

const isValidStatus = async (code: string): Promise<boolean> => {
  const status = await StatusMaster.findOne({ where: { code, deleted: 0 } });
  return !!status;
};

/**
 * Create a new task with team members (transactional)
 */
const createNewTask = async (
  taskData: TaskCreateInput,
  teamMembers: number[] | undefined,
  createdBy: number
) => {
  return await sequelize.transaction(async (t: Transaction) => {
    const newTask = await Task.create(
      {
        name: taskData.name,
        description: taskData.description,
        status: taskData.status,
        dueDate: taskData.dueDate,
        createdBy,
        deleted: 0,
      },
      { transaction: t }
    );

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
const updateExistingTask = async (id: number, updateData: UpdateTaskInput) => {
  const task = await Task.findOne({ where: { id, deleted: 0 } });
  if (!task) return null;
  await task.update(updateData);
  return task;
};

/**
 * Add a comment to a task
 */
const addTaskComment = async (taskId: number, userId: number, comment: string) => {
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
const softDeleteTaskById = async (id: number, deletedBy: number) => {
  const task = await Task.findOne({ where: { id, deleted: 0 } });
  if (!task) return null;

  await task.update({
    deleted: 1,
    deletedAt: new Date(),
    deletedBy,
  });

  return task;
};

export {
  getTasksByStatusCode,
  getAllActiveTasks,
  getTaskByIdWithStatus,
  isValidStatus,
  createNewTask,
  updateExistingTask,
  addTaskComment,
  softDeleteTaskById,
};
