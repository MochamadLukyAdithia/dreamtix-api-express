import Joi from "joi";

const createCartValidation = Joi.object({
    jumlah: Joi.number().min(1).default(1).required(),
    total : Joi.number().min(1).required(),
});
const getCartValidation = Joi.number().min(1).positive().required();
const updateCartValidation = Joi.object({
    jumlah: Joi.number().min(1).required(),
    total : Joi.number().min(0).required(),
});
const searchCartValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).optional(),
    size: Joi.number().min(1).positive().max(100).default(10).optional(),
    jumlah: Joi.number().optional(),
    total: Joi.number().optional(),
});
export {
    createCartValidation,
    getCartValidation,
    updateCartValidation,
    searchCartValidation
};