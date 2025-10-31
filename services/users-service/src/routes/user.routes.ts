import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import { asyncHandler } from "@app/shared/middleware/asyncHandler.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validator.js";
import { validate as validateSchema } from "@app/shared/utils/validateSchema.js";

const router = Router();

router.post(
  "/",
  validateSchema(createUserSchema),
  asyncHandler(controller.createUserHandler)
);
router.get("/", asyncHandler(controller.listUsersHandler));
router.get("/:id", asyncHandler(controller.getUserHandler));
router.patch(
  "/:id",
  validateSchema(updateUserSchema),
  asyncHandler(controller.updateUserHandler)
);
router.delete("/:id", asyncHandler(controller.deleteUserHandler));
router.get("/:id/posts", asyncHandler(controller.getUserWithPostsHandler));


export default router;
