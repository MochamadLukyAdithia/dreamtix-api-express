import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    email: Joi.string().max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    role : Joi.string().valid('admin', 'user').required(),
    name: Joi.string().max(255).required(),
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required()
    ,
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
     username: Joi.string().max(255).required(),
    password: Joi.string().max(255).optional(),
    email: Joi.string().max(255).optional().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    role : Joi.string().valid('admin', 'user').optional(),
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
