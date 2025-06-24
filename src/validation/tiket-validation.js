import Joi from "joi";

const createTiketValidation = Joi.object({
  harga: Joi.number().min(1).required(),
  stok: Joi.number().min(1).required(),
  nama: Joi.number().min(1).positive().required(),
  nama_event: Joi.string().max(255).required(),
  waktu: Joi.date().default(Date.now()).required() ,
  artis: Joi.string().max(255).required(),
  image: Joi.string().max(10000).required(),
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
