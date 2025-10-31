import { Request, Response } from "express";
import { ApiResponse } from "@app/shared/utils/response.js";
import { postService } from "../services/post.service.js";
import { usersClient } from "../lib/usersClient.js";
import { publish } from "../config/rabbitmq.js";

export async function getUserPosts(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  try {
    await usersClient.get(`/${userId}`);
  } catch {
    return ApiResponse.notFound(res, "User not found");
  }

  const posts = await postService.findByUserId(userId);
  return ApiResponse.success(res, "User posts retrieved", posts);
}

export async function getPostWithAuthor(req: Request, res: Response) {
  const id = Number(req.params.id);
  const post = await postService.findByIdWithAuthor(id);

  if (!post) return ApiResponse.notFound(res, "Post not found");

  return ApiResponse.success(res, "Post retrieved", post);
}

export async function createPostHandler(req: Request, res: Response) {
  const { userId } = req.body;
  let user = null;
  try {
    user = (await usersClient.get(`/${userId}`)).data;
  } catch(err) {
    return ApiResponse.notFound(res, "Cannot create post — user not found");
  }

  const post = await postService.create(req.body);
  await publish("post.created", post);
  return ApiResponse.created(res, "Post created successfully", post);
}

export async function listPostsHandler(req: Request, res: Response) {
  const posts = await postService.list(req.query as any);
  return ApiResponse.success(res, "Posts retrieved successfully", posts);
}

export async function getPostHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const post = await postService.findById(id);

  if (!post) return ApiResponse.notFound(res, "Post not found");

  return ApiResponse.success(res, "Post retrieved", post);
}

export async function getPostsByUserHandler(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  try {
    await usersClient.get(`/${userId}`);
  } catch {
    return ApiResponse.notFound(res, "User not found");
  }

  const posts = await postService.findByUserId(userId);
  return ApiResponse.success(res, "User posts retrieved", posts);
}

export async function updatePostHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const post = await postService.update(id, req.body);

  if (!post) return ApiResponse.notFound(res, "Post not found");
  
  await publish("post.updated", post);
  return ApiResponse.success(res, "Post updated successfully", post);
}

export async function deletePostHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await postService.delete(id);

  if (!deleted) return ApiResponse.notFound(res, "Post not found");
  await publish("post.deleted", { id });
  return ApiResponse.noContent(res);
}
