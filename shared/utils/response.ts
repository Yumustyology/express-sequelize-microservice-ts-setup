import { Response } from 'express';
import { ResponseType } from '../types/response.types.js';

export class ApiResponse {
  static success(
    res: Response,
    message: string,
    data?: any,
    statusCode: number = 200,
    meta?: ResponseType['meta']
  ) {
    const response: ResponseType = {
      status: 'success',
      statusCode,
      message,
      data,
      ...(meta && { meta }),
    };
    return res.status(statusCode).json(response);
  }

  static fail(
    res: Response,
    message: string,
    error?: any,
    statusCode: number = 400
  ) {
    const response: ResponseType = {
      status: 'fail',
      statusCode,
      message,
      ...(error && { error }),
    };
    return res.status(statusCode).json(response);
  }

  static created(res: Response, message: string, data?: any) {
    return this.success(res, message, data, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }

  static notFound(res: Response, message: string = 'Resource not found') {
    return this.fail(res, message, null, 404);
  }

  static validationError(res: Response, errors: any[]) {
    return this.fail(res, 'Validation failed', errors, 400);
  }

  static conflict(res: Response, message: string, error?: any) {
    return this.fail(res, message, error, 409);
  }

  static serverError(res: Response, message: string = 'Internal server error', error?: any) {
    return this.fail(res, message, error, 500);
  }
}