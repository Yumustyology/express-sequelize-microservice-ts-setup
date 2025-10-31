import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    // target: "http://post-service:4002",
    target: "http://localhost:4002/api",
    changeOrigin: true,
    pathRewrite: { "^/posts": "" },
  })
);

export default router;
