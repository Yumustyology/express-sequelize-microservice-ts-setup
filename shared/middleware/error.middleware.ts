import { Request, Response, NextFunction } from "express";
// import * as Joi from "joi";
// import {
//   ValidationError,
//   UniqueConstraintError,
//   DatabaseError,
// } from "sequelize";
import { ResponseType } from "../types/response.types.js";
import { logError } from "../utils/logger.js";

interface ErrorWithStatus extends Error {
  status?: number;
  isJoi?: boolean;
  details?: any;
}

export function errorHandler(
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logError(`[${req.method}] ${req.path}`, err);

  if (err?.isJoi || err.name === "ValidationError") {
    const errors =
      err.details?.map((detail: any) => ({
        field: detail.path.join("."),
        message: detail.message.replace(/"/g, ""),
      })) || [];

    const response: ResponseType = {
      status: "fail",
      statusCode: 400,
      message: "Validation failed",
      error: errors,
    };
    return res.status(400).json(response);
  }

  if (
    err.name === "SequelizeUniqueConstraintError"
    // || err instanceof UniqueConstraintError
  ) {
    const sequelizeError = err as any;
    const field = sequelizeError.errors?.[0]?.path || "field";
    const value = sequelizeError.errors?.[0]?.value || "";

    const response: ResponseType = {
      status: "fail",
      statusCode: 409,
      message: `${field} '${value}' already exists`,
      error: sequelizeError.errors?.map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    };
    return res.status(409).json(response);
  }

  if (
    err.name === "SequelizeValidationError"
    // || err instanceof ValidationError
  ) {
    const sequelizeError = err as any;
    const errors =
      sequelizeError.errors?.map((e: any) => ({
        field: e.path,
        message: e.message,
      })) || [];

    const response: ResponseType = {
      status: "fail",
      statusCode: 400,
      message: errors[0]?.message || "Validation failed",
      error: errors,
    };
    return res.status(400).json(response);
  }

  if (
    // err instanceof DatabaseError
    err.name === "SequelizeDatabaseError"
  ) {
    const response: ResponseType = {
      status: "fail",
      statusCode: 500,
      message: "Database error occurred",
    };
    return res.status(500).json(response);
  }

  if (err.status === 404) {
    const response: ResponseType = {
      status: "fail",
      statusCode: 404,
      message: err.message || "Resource not found",
    };
    return res.status(404).json(response);
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  const response: ResponseType = {
    status: "fail",
    statusCode: status,
    message,
    ...(process.env.NODE_ENV !== "production" &&
      err.stack && {
        error: { stack: err.stack.split("\n").slice(0, 3).join("\n") },
      }),
  };

  res.status(status).json(response);
}
