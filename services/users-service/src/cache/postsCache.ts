import redis from "../config/redisClient.js";

const POST_CACHE_PREFIX = "post:";
const POST_CACHE_TTL = 60 * 60 * 2; // 2 hours cache

export interface CachedPost {
  id: string;
  userId: string;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

// Save to cache
export const cachePost = async (post: CachedPost) => {
  const key = `${POST_CACHE_PREFIX}${post.id}`;
  await redis.set(key, JSON.stringify(post), "EX", POST_CACHE_TTL);
};

// Get post from cache
export const getPostFromCache = async (postId: string) => {
  const data = await redis.get(`${POST_CACHE_PREFIX}${postId}`);
  return data ? (JSON.parse(data) as CachedPost) : null;
};

// Remove post from cache
export const deletePostFromCache = async (postId: string) => {
  await redis.del(`${POST_CACHE_PREFIX}${postId}`);
};
