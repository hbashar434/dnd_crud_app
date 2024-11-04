import { Request, Response } from 'express';

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './userModel';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';

// create a new user
export const addUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await createUser(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, newUser, 'User created successfully'));
});

// get all users
export const fetchUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(new ApiResponse(200, users, 'Users retrieved successfully'));
});

// get user
export const fetchUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getUserById(Number(req.params.id));
    res.json(new ApiResponse(200, user, 'User retrieved successfully'));
  }
);

// update user
export const modifyUser = asyncHandler(async (req: Request, res: Response) => {
  const updatedUser = await updateUser(Number(req.params.id), req.body);
  res.json(new ApiResponse(200, updatedUser, 'User updated successfully'));
});

// delete user
export const removeUser = asyncHandler(async (req: Request, res: Response) => {
  await deleteUser(Number(req.params.id));
  res.status(204).json(new ApiResponse(204, null, 'User deleted successfully'));
});
