import Joi from "joi";

// Validasi saat create banner
const createBannerValidation = Joi.object({
  image: Joi.string()
    .uri()
    .required()
    .messages({
      "any.required": "Image wajib diisi",
      "string.uri": "Image harus berupa URL valid",
    }),
});

// Validasi saat update banner
const updateBannerValidation = Joi.object({
  id_banner: Joi.number()
    .min(1)
    .required()
    .messages({
      "any.required": "ID Banner wajib diisi",
    }),
  image: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": "Image harus berupa URL valid",
    }),
});

// Validasi untuk delete banner (jika menggunakan query atau body)
const deleteBannerValidation = Joi.object({
  id_banner: Joi.number()
    .min(1)
    .required()
    .messages({
      "any.required": "ID Banner wajib diisi",
    }),
});

// Validasi untuk ambil 1 banner by ID
const getBannerValidation = Joi.number()
  .min(1)
  .positive()
  .required();

// Validasi pencarian (kalau kamu butuh filtering atau pagination)
const searchBannerValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
});

export {
  createBannerValidation,
  updateBannerValidation,
  deleteBannerValidation,
  getBannerValidation,
  searchBannerValidation,
};
