import axios from "axios";

const USERS_SERVICE_URL =
  process.env.USERS_SERVICE_URL || "http://localhost:4001/api";

export const usersClient = axios.create({
  baseURL: USERS_SERVICE_URL,
  timeout: 5000,
});
