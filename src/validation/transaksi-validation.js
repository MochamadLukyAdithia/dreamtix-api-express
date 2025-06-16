import Joi from "joi"

const createTransaksiValidation = Joi.object({
    waktu: Joi.string().max(255).optional(),
    total: Joi.number().min(0).required(),
    id_pesan : Joi.number().min(1).required(),    
    id_metode : Joi.number().min(1).required(),
})
export {
    createTransaksiValidation
}