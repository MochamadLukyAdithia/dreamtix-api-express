import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createMetodeValidation, getMetodeValidation, searchMetodeValidation, updateMetodeValidation } from "../validation/metode-validation.js";

const create = async (request) => {
    const metode = validate(createMetodeValidation, request);
    console.log("Ini metode", metode)
    return prismaClient.metodePembayaran.create({
        data: metode,
        select: {
            nama : true,
            provider: true,
            nomor:true
        }
    })
}
const getAll = async () => {
    return prismaClient.metodePembayaran.findMany({
        select : {
            id_metode: true,
            nama : true,
            provider:true,
            nomor:true
        }
    })
}
export default{
    create,
    getAll
}