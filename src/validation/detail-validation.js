import Joi from "joi";
const createDetailValidation = Joi.object({
    quantity: Joi.number().min(1).required(),
    total: Joi.number().min(0).required(),
    id_pesan : Joi.number().min(1).positive().required(),
    id_tiket : Joi.number().min(1).positive().required()
});

const getDetailValidation = Joi.number().min(1).positive().required();
const updateDetailValidation = Joi.object({
    jumlah: Joi.number().min(1).required(),
    total: Joi.number().min(0).required(),
});
const searchDetailValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).optional(),
    size: Joi.number().min(1).positive().max(100).default(10).optional(),
    jumlah: Joi.number().optional(),
    total: Joi.number().optional(),
});
export {
    createDetailValidation,
    getDetailValidation,
    updateDetailValidation,
    searchDetailValidation
};