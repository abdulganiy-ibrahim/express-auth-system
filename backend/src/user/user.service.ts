import type { PublicUser } from '../types/user.types.js';
import * as userRepo from './user.repository.js';

export const getUsers = async () => {
  const users = await userRepo.getUsers();

  return users
}

export const getUserById = async (userId: string) => {
  const user = await userRepo.getUserById(userId);

  return user;
}

export const deleteUserById = async (userId: string) => {
  const deletedUser = await userRepo.deleteUserById(userId);

  return deletedUser;
}