import { Op } from "sequelize";
import { BaseRepository } from "@app/shared/repositories/base.repository.js";
import User from "../models/user.model.js";
import { postsClient } from "../lib/postsClient.js";

export class UserRepository extends BaseRepository<InstanceType<typeof User>> {
  constructor() {
    super(User);
  }

  async searchUsers(query?: { q?: string; limit?: number; offset?: number }) {
    const where = query?.q
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${query.q}%` } },
            { email: { [Op.like]: `%${query.q}%` } },
          ],
        }
      : undefined;

    return this.findAll({
      where,
      limit: query?.limit,
      offset: query?.offset,
    });
  }

  async findByIdWithPosts(id: number) {
    // get user record
    const user = await User.findByPk(id);
    if (!user) return null;

    // convert model instance -> plain object
    const plainUser = user.get({ plain: true });

    // fetch posts from posts-service
    let posts = [];
    try {
      const response = await postsClient.get(`/user/${id}`);
      console.log("Posts-service response:", response?.data);
      posts = response?.data?.data || [];
    } catch (err) {
      console.error("Error fetching posts from posts-service:", err);
      posts = [];
    }

    return {
      ...plainUser,
      posts,
    };
  }
}
