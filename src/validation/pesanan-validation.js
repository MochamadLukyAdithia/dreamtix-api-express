import Joi from "joi";

const createPesananValidation = Joi.object({
    id_customer: Joi.number().min(1).positive().optional(),
    tanggal: Joi.string().optional(),
    quantity: Joi.number().min(1).required(),
    total: Joi.number().min(0).required(),
    id_tiket : Joi.number().min(1).positive().required()
});

const getPesananValidation = Joi.number().min(1).positive();
const updatePesananValidation = Joi.object({
    tanggal : Joi.string().max(255).required(),
});
const searchPesananValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).optional(),
    size: Joi.number().min(1).positive().max(100).default(10).optional(),
    tanggal: Joi.string().optional(),
});
export {
    createPesananValidation,
    getPesananValidation,
    updatePesananValidation,
    searchPesananValidation
};