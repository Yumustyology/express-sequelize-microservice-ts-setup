import { PostRepository } from "../repositories/post.repository.js";

const postRepo = new PostRepository();

export const postService = {
  create: (data: { title: string; content?: string; userId: number }) =>
    postRepo.create(data),
  
  findById: (id: number) => postRepo.findById(id),
  
  findByIdWithAuthor: (id: number) => postRepo.findByIdWithAuthor(id),
  list: (query?: { q?: string; userId?: number; limit?: number; offset?: number }) =>
    postRepo.searchPosts(query),
  
  findByUserId: (userId: number, options?: { limit?: number; offset?: number }) =>
    postRepo.findByUserId(userId, options),
  
  update: (id: number, data: Partial<{ title: string; content: string; userId: number }>) =>
    postRepo.update(id, data),
  
  delete: (id: number) => postRepo.delete(id),
};