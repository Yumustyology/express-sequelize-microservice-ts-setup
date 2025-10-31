import { UserRepository } from "../repositories/user.repository.js";

const userRepo = new UserRepository();

export const userService = {
  create: (data: { name: string; email: string }) => userRepo.create(data),
  findById: (id: number) => userRepo.findById(id),
  findByIdWithPosts: (id: number) => userRepo.findByIdWithPosts(id), 
  list: (query?: { q?: string; limit?: number; offset?: number }) =>
    userRepo.searchUsers(query),
  update: (id: number, data: Partial<{ name: string; email: string }>) =>
    userRepo.update(id, data),
  delete: (id: number) => userRepo.delete(id),
};