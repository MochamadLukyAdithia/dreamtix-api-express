import Joi from "joi";
const createQrValidation = Joi.object({
    kode_qr: Joi.string().max(255).required(),
    is_used: Joi.boolean().default(false).optional(),
});
const getQrValidation = Joi.number().min(1).positive().required();
// const updateQrValidation = Joi.object({
//     is_used: Joi.boolean().optional(),
//     kode_qr: Joi.string().max(255).optional(),
// });
const searchQrValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).optional(),
    size: Joi.number().min(1).positive().max(100).default(10).optional(),
    kode: Joi.string().optional(),
    is_used: Joi.boolean().optional(),
});
export {
    createQrValidation,
    getQrValidation,
    // updateQrValidation,
    searchQrValidation
};