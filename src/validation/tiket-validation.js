import Joi from "joi";

const createTiketValidation = Joi.object({
  harga: Joi.number().min(1).required(),
  stok: Joi.number().min(1).required(),
  id_category: Joi.number().min(1).positive().required(),
});
const getTiketValidation = Joi.number().positive().required();
const updateTiketValidation = Joi.object({
  harga: Joi.number().min(1000).optional(),
  stok: Joi.number().min(1).optional(),
});
const searchTiketValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  name: Joi.string().optional(),
  price: Joi.number().optional(),
});
export {
  createTiketValidation,
  getTiketValidation,
  updateTiketValidation,
  searchTiketValidation,
};
