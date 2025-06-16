import { createQrValidation } from "../validation/qr-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

const create = async (id_tiket, request) => {
    const qr = validate(createQrValidation, request);
    qr.id_tiket = parseInt(id_tiket);
    const countQr = await prismaClient.qR.count({
        where: {
            id_tiket: qr.id_tiket
        }
    });
    if (countQr > 0) {
        throw new ResponseError(400, "QR code already exists for this event");
    }

    return prismaClient.qR.create({
        data: qr,
        select: {
            is_used: true,
            kode_qr: true,
            id_tiket: true,
        }
    });
}
const getAll = async (id_tiket) => {
    id_tiket = parseInt(id_tiket);
    const qrs = await prismaClient.qR.findMany({
        where: {
            id_tiket: id_tiket
        },
        select: {
            kode_qr: true,
            is_used: true,
            id_tiket: true
        }
    });

    if (qrs.length === 0) {
        throw new ResponseError(404, "No QR codes found for this ticket");
    }

    return qrs;
}
const getMany = async (quantity, id_tiket) => {
    parseInt(quantity);
    const id =  parseInt(id_tiket);
    const qrs = await prismaClient.qR.findMany({
        where : {
            id_tiket : id,
            is_used : false
        },
        take: quantity,
        select : {
            kode_qr : true,
            id_tiket:true,
            is_used:true
        }
    })
    return qrs
}
const update = async (kode_qr) => {
    console.log("QR Code to update:", kode_qr);
    const updatedQr = await prismaClient.qR.update({
        where: {
            kode_qr: kode_qr
        },
        data: {
            is_used: true,
        },
        select: {
            is_used: true,
            kode_qr: true
        }
    });

    if (!updatedQr) {
        throw new ResponseError(404, "QR code not found");
    }

    return updatedQr;
}
const sender = async (is_used) => {
    const qr = await prismaClient.qR.findFirst({
        where: {
            is_used: is_used
        },
        select: {
            is_used: true,
            kode_qr: true,
            id_tiket: true
        }
    });

    if (!qr) {
        throw new ResponseError(404, "QR code not found");
    }

    return qr;
}
export default {
    create,
    getAll,
    update,
    sender,
    getMany
}