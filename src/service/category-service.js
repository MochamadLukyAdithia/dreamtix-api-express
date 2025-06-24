import { createCategoryValidation, getCategoryValidation,updateCategoryValidation } from "../validation/category-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
    const category = validate(createCategoryValidation, request);

    const countCategory = await prismaClient.category.count({
        where: {
            nama: category.nama
        }
    });

    if (countCategory > 0) {
        throw new ResponseError(400, "Category already exists");
    }

    return prismaClient.category.create({
        data: category,
        select: {
            id_category: true,
            nama: true,
            posisi:true
        }
    });
}
const getAll = async () => {
    const categories = await prismaClient.category.findMany({
        select: {
            id_category: true,
            nama: true,
            posisi:true
        }
    });

    if (categories.length === 0) {
        throw new ResponseError(404, "No categories found");
    }

    return categories;
}
const get = async (id_category) => {
    validate(getCategoryValidation, id_category);
    id_category = parseInt(id_category);
    const category = await prismaClient.category.findUnique({
        where: {
            id_category: id_category
        },
        select: {
            id_category: true,
            nama: true,
            posisi:true
        }
    });

    if (!category) {
        throw new ResponseError(404, "Category not found");
    }

    return category;
}
const filter = async (nama) => {
    const category = await prismaClient.category.findFirst({
        where: {
            nama: nama
        },
        select: {
            id_category: true,
            nama: true,
            posisi:true
        }
    });

    if (!category) {
        throw new ResponseError(404, "Category not found");
    }

    return category;
}
const update = async (id_category, request) => {
    console.log("ID Category:", id_category);
    const category = validate(updateCategoryValidation, request)
    const updatedCategory = await prismaClient.category.update({
        where: {
            id_category: parseInt(id_category)
        },
        data: category,
        select: {
            id_category: true,
            nama: true,
            posisi:true
        }
    });

    if (!updatedCategory) {
        throw new ResponseError(404, "Category not found");
    }

    return updatedCategory;
}
const remove = async (id_category) => {
    return prismaClient.category.delete({
        where: {
            id_category: parseInt(id_category)
        },
    });
}

export default{
    filter,
    create,
    get,
    update,
    getAll,
    remove
}