import axios from "axios";

const POSTS_SERVICE_URL =
  process.env.POSTS_SERVICE_URL || "http://localhost:4002/api";

export const postsClient = axios.create({
  baseURL: POSTS_SERVICE_URL,
  timeout: 5000,
});
