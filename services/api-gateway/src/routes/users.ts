import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    // target: "http://user-service:4001",
    target: "http://localhost:4001/api",
    changeOrigin: true,
    pathRewrite: { "^/users": "" },
  })
);

export default router;
