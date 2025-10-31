import Joi from 'joi';

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().optional().allow(''),
  userId: Joi.number().integer().positive().required(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  content: Joi.string().optional().allow(''),
  userId: Joi.number().integer().positive().optional(),
}).min(1);