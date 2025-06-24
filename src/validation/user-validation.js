import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().max(255).required(),
  password: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  token: Joi.string().optional(),
  longitude: Joi.number().min(-180).max(180).required(),
  latitude: Joi.number().min(-90).max(90).required()
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    username: Joi.string().max(255).optional(),
    password: Joi.string().max(255).optional(),
    email: Joi.string().max(255).optional().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional,
    longitude: Joi.number().max(255).optional(),
    latitude: Joi.number().max(255).optional(),
})
export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
