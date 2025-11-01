import redis from "../config/redisClient.js";

const USER_CACHE_PREFIX = "user:";
const USER_CACHE_TTL = 60 * 60 * 2; // 2 hours cache

export interface CachedUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

// Save to cache
export const cacheUser = async (user: CachedUser) => {
  const key = `${USER_CACHE_PREFIX}${user.id}`;
  await redis.set(key, JSON.stringify(user), "EX", USER_CACHE_TTL);
};

// Get from cache
export const getUserFromCache = async (userId: string) => {
  const data = await redis.get(`${USER_CACHE_PREFIX}${userId}`);
  return data ? (JSON.parse(data) as CachedUser) : null;
};

export const updateUserInCache = async (user: CachedUser) => {
  const key = `${USER_CACHE_PREFIX}${user.id}`;
  const exists = await redis.exists(key);
  if (exists) {
    await redis.set(key, JSON.stringify(user), "EX", USER_CACHE_TTL);
  }else{
    await cacheUser(user);
  }
};

// Remove user from cache
export const deleteUserFromCache = async (userId: string) => {
  await redis.del(`${USER_CACHE_PREFIX}${userId}`);
};
