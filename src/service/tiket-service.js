import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
    createTiketValidation,
    getTiketValidation,
    updateTiketValidation
} from "../validation/tiket-validation.js";
import  {v4 as uuid} from "uuid";


const checkTiketMustExists = async (id_tiket) => {
    id_tiket = validate(getTiketValidation, id_tiket);
    const totalTiket = await prismaClient.tiket.count({
        where: {
            id_tiket: id_tiket
        }
    });
    if (totalTiket !== 1) {
        throw new ResponseError(404, "Tiket not found");
    }
    return id_tiket;
};
const create = async (id_event, request) => {
    const tiket = validate(createTiketValidation, request);
    tiket.id_event = parseInt(id_event);

    // Buat tiket dulu
    const createdTiket = await prismaClient.tiket.create({
        data: tiket,
        select: {
            id_tiket: true,
            harga: true,
            stok: true,
        }
    });

    // Generate QR code sebanyak stok
    const qrData = Array.from({ length: tiket.stok }, () => ({
        id_tiket: createdTiket.id_tiket,
        kode_qr: uuid(),
        is_used: false
    }));

    // Insert semua QR code
    await prismaClient.qR.createMany({
        data: qrData
    });

    return createdTiket;
};

const getAll = async (id_event) => {
    const id_e = parseInt(id_event);
    return prismaClient.tiket.findMany({
        where : {
            id_tiket: id_e
        },
        select: {
            id_tiket : true,
            id_category: true,
            id_event : true,
            harga: true,
            stok: true,
            event : {
                select : {
                    nama_event: true,
                    artis: true,
                    waktu: true
                }
            },
            category : {
                select : {
                    id_category: true,
                    nama: true,
                    posisi: true
                }
            }
        }
    })
}
const get = async (id_tiket) => {
    id_tiket = await checkTiketMustExists(id_tiket);
    return prismaClient.tiket.findFirst({
        where: {
            id_tiket: id_tiket
        },
        select: {
            id_tiket: true,
            harga: true,
            stok: true,
        }
    });
};

const update = async (id_tiket, request) => {
    id_tiket = await checkTiketMustExists(id_tiket);

    return prismaClient.tiket.update({
        where: {
            id_tiket: id_tiket
        },
        data: {
            stok : request
        },
        select: {
            id_tiket: true,
            harga: true,
            stok: true,
            id_category: true,
            id_event : true
        }
    });
};

const remove = async (id_tiket) => {
    id_tiket = await checkTiketMustExists(id_tiket);

    return prismaClient.tiket.delete({
        where: {
            id_tiket: id_tiket
        }
    });
};

const list = async (id_event) => {
    return prismaClient.tiket.findMany({
        where: {
            id_event: parseInt(id_event)
        },
        select: {
            id_tiket: true,
            name: true,
            price: true,
        }
    });
};

export default {
    create,
    get,
    update,
    remove,
    list,
    getAll
};
