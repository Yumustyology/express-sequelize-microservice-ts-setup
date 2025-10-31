// import type { RequestHandler } from "express";

export const asyncHandler = (fn) => (req, res, next) => {
  console.log("dbgn ggg")
  Promise.resolve(fn(req, res, next)).catch(next);
};
