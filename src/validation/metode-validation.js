import Joi from "joi";
const createMetodeValidation = Joi.object({
    nama: Joi.string().max(100).required(),
    nomor: Joi.string().max(20).required(),
    provider : Joi.string().max(100).required(),
});
const getMetodeValidation = Joi.number().positive().required();
const updateMetodeValidation = Joi.object({
    nama: Joi.string().max(100).required(),
    nomor: Joi.number().max(255).optional(),
    provider : Joi.string().max(100).required(),
});
const searchMetodeValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    nama: Joi.string().optional(),
    provider: Joi.string().optional(),
});
export {
    createMetodeValidation,
    getMetodeValidation,
    updateMetodeValidation,
    searchMetodeValidation
}