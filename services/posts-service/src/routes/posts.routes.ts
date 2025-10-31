import { Router } from "express";
import * as controller from "../controllers/post.controller.js";
import { asyncHandler } from "@app/shared/middleware/asyncHandler.middleware.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.validator.js";
import { validate as validateSchema } from "@app/shared/utils/validateSchema.js";

const router = Router();

router.post(
  "/",
  validateSchema(createPostSchema),
  asyncHandler(controller.createPostHandler)
);

router.get("/", asyncHandler(controller.listPostsHandler));

router.get("/:id", asyncHandler(controller.getPostHandler));

router.patch(
  "/:id",
  validateSchema(updatePostSchema),
  asyncHandler(controller.updatePostHandler)
);

router.delete("/:id", asyncHandler(controller.deletePostHandler));

router.get("/user/:userId", asyncHandler(controller.getPostsByUserHandler));

export default router;
