    import Joi from "joi";

    const createTiketValidation = Joi.object({
        name: Joi.string().max(100).required(),
        price: Joi.number().required(),
    });
    const getTiketValidation = Joi.number().positive().required();
    const updateTiketValidation = Joi.object({
        name: Joi.string().max(100).required(),
price: Joi.number().max(1000000000000000).required()

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
        searchTiketValidation
    }
