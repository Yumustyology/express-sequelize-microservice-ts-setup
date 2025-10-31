import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

export function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, ''),
        details: error.details,
      }));
      
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors,
      });
    }
    
    next();
  };
}

// export function validate(schema: Joi.ObjectSchema) {
//   return (req: Request, _res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req.body, { abortEarly: false });

//     if (error) {
//       const errors = error.details.map((detail) => ({
//         field: detail.path.join('.'),
//         message: detail.message.replace(/"/g, ''),
//       }));

//       const err: any = new Error('Validation failed');
//       err.status = 400;
//       err.isJoi = true; 
//       err.details = error.details;

//       return next(err);
//     }
    
//     return next();
//   };
// }
