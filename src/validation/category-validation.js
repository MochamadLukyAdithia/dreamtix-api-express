import Joi from "joi";

const createCategoryValidation = Joi.object({
    nama: Joi.string().max(255).required(),
    posisi: Joi.string().max(500).required(),
});
const getCategoryValidation = Joi.number().min(1).positive().required();
const updateCategoryValidation = Joi.object({
    nama: Joi.string().max(255).optional(),
    posisi: Joi.string().max(500).optional(),
});
const searchCategoryValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).optional(),
    size: Joi.number().min(1).positive().max(100).default(10).optional(),
    nama: Joi.string().optional(),
    posisi: Joi.string().optional(),
});
const deleteCategoryValidation = Joi.number().min(1).positive().required();

export {
    createCategoryValidation,
    getCategoryValidation,
    updateCategoryValidation,
    searchCategoryValidation,
    deleteCategoryValidation
}