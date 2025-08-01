import Joi from "joi";
const loginAdminValidation = Joi.object(
    {
        username : Joi.string().max(255).required(),
        password : Joi.string().max(255).required(),
    }
)
const registerAdminValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    email: Joi.string().max(255).required().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
    }), 
});
const updateAdminValidation = Joi.object({
    username: Joi.string().max(255).optional(),
    password: Joi.string().max(255).optional(),
});
const getAdminValidation = Joi.string().max(100).required();

export {
    loginAdminValidation,
    registerAdminValidation,
    updateAdminValidation,
    getAdminValidation
}
