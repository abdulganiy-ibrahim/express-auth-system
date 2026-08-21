import type { PublicUser } from '../types/user.types.js';
import * as userRepo from './user.repository.js';

export const getUsers = async () => {
  const users = await userRepo.getUsers();

  return users
}