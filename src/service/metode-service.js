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
const update = async (id_metode, request) => {
    const metode = validate(updateMetodeValidation, request)
    return prismaClient.metodePembayaran.update({
        where : {
            id_metode: parseInt(id_metode)
        },
        data: metode
    })
}
const remove = async(id_metode)=> {
    return prismaClient.    metodePembayaran.delete({
        where: {
            id_metode: parseInt(id_metode)
        }
    })
}
const get = async(id_metode)=> {
    return prismaClient.metodePembayaran.findFirst({
        where: {
            id_metode: parseInt(id_metode)
        }, select: {
            id_metode: true,
            nama: true,
            provider: true,
            nomor: true
        }
    })
}
export default{
    create,
    getAll,
    update,
    remove,
    get
}