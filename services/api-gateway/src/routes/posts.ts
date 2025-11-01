import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: process.env.POST_SERVICE_URL || "http://localhost:4002/api",
    changeOrigin: true,
    pathRewrite: { "^/posts": "" },
  })
);

export default router;
