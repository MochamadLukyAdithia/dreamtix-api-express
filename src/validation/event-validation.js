import Joi from "joi";

const createEventValidation = Joi.object({
    id_admin: Joi.number().min(1).positive().optional(),
    nama_event: Joi.string().max(255).required(),
    waktu: Joi.date().default(Date.now()).required() ,// ini benar
    artis: Joi.string().max(255).required(),
});

const updateEventValidation = Joi.object({
    nama_event: Joi.string().max(255).optional(),
    artis: Joi.string().max(100).optional(),
    waktu: Joi.string().max(100).optional(),
});

const getEventValidation = Joi.number().min(1).positive();

const searchEventValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).optional(),
    size: Joi.number().min(1).positive().max(100).default(10).optional(),
    nama_event: Joi.string().optional(),
    artis: Joi.string().optional(),
})

export {
    createEventValidation,
    getEventValidation,
    updateEventValidation,
    searchEventValidation
}
