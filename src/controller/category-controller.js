import categoryService from "../service/category-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        console.log("Request body:", request);
        const result = await categoryService.create(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        logger.error("Error creating category:", e);
        next(e);
    }
}
const get = async (req, res, next) => {
    try {
        const id_category = req.params.id_category;
        console.log("ID Category:", id_category);
        const result = await categoryService.get(id_category);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        logger.error("Error getting category:", e);
        next(e);
    }
}
const getAll = async (req, res, next) => {
    try {
        const result = await categoryService.getAll();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        logger.error("Error getting all categories:", e);
        next(e);
    }
}
const update = async (req, res, next) => {
    try
    {
        const id_category = req.params.id_category;
        console.log("Ini ID Category", id_category)
        const request = req.body;
        const result = await categoryService.update(id_category, request);
        res.status(200).json({
            data : result
        });
    }
catch (e) {
    console.log("Error", e);
    next(e);
}
}



export default {
    create, get, getAll, update
};