import Joi from "joi";

const createEventValidation = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().max(255).required(),
    date: Joi.string().max(255).required(),
    location: Joi.string().max(255).required(),
});

const updateEventValidation = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().max(100).optional(),
    date: Joi.string().max(100).optional(),
    location: Joi.string().max(100).optional(),
});

const getEventValidation = Joi.number().min(1).positive();

const searchEventValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).optional(),
    size: Joi.number().min(1).positive().max(100).default(10).optional(),
    name: Joi.string().optional(),
    location: Joi.string().optional(),
})

export {
    createEventValidation,
    getEventValidation,
    updateEventValidation,
    searchEventValidation
}
