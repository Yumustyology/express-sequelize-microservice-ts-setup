import { Op } from "sequelize";
import { BaseRepository } from "@app/shared/repositories/base.repository.js";
import Post from "../models/post.model.js";
import { usersClient } from "../lib/usersClient.js";
import { UserResponse } from "../types/user.type.js";

export class PostRepository extends BaseRepository<InstanceType<typeof Post>> {
  constructor() {
    super(Post);
  }

  async attachAuthor(post: any) {
    try {
      const { data } = await usersClient.get<UserResponse>(`/${post.userId}`);
      return {
        ...post,
        author: {
          name: data.data?.name || null,
          email: data.data?.email || null,
          id: data.data?.id || null,
        },
      };
    } catch {
      return { ...post, author: null };
    }
  }

  async findByIdWithAuthor(id: number) {
    const instance = await Post.findByPk(id);
    if (!instance) return null;

    const post = instance.get({ plain: true });
    return this.attachAuthor(post);
  }

  async findAllWithAuthor(options?: {
    where?: any;
    limit?: number;
    offset?: number;
  }) {
    const { where, limit, offset } = options || {};

    const posts = await Post.findAll({
      where,
      limit: limit ?? this.defaultLimit,
      offset: offset ?? this.defaultOffset,
      order: [["createdAt", "DESC"]],
    });

    const plainPosts = posts.map((p: any) => p.get({ plain: true }));

    return Promise.all(plainPosts.map((post) => this.attachAuthor(post)));
  }

  async findByUserId(
    userId: number,
    options?: { limit?: number; offset?: number }
  ) {
    return this.findAllWithAuthor({
      where: { userId },
      limit: options?.limit,
      offset: options?.offset,
    });
  }

  async searchPosts(query?: {
    q?: string;
    userId?: number;
    limit?: number;
    offset?: number;
  }) {
    const where: any = {};

    if (query?.q) {
      where[Op.or] = [
        { title: { [Op.like]: `%${query.q}%` } },
        { content: { [Op.like]: `%${query.q}%` } },
      ];
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    return this.findAllWithAuthor({
      where,
      limit: query?.limit,
      offset: query?.offset,
    });
  }
}
