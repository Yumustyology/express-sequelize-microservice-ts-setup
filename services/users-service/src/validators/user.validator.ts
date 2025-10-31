import Joi from 'joi';
    
export const createUserSchema = Joi.object({
    name: Joi.string().min(2).max(128).required(),
    email: Joi.string().email().required()
});


export const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(128).optional(),
    email: Joi.string().email().optional()
}).min(1);