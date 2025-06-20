import Joi from "joi"

const createTransaksiValidation = Joi.object({
    waktu: Joi.string().min(0).required(),
    status: Joi.string().min(0).default("belum").required(),
    id_pesan : Joi.number().min(1).optional(),    
    id_metode : Joi.number().min(1).required(),
})
export {
    createTransaksiValidation
}