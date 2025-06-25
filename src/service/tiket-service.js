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
const create = async (id_category,id_event, request) => {
    console.log("ID CATEGORY", id_category);
    console.log("ID EVENT", id_event);

    // Buat tiket dulu
    const createdTiket = await prismaClient.tiket.create({
        data: {
            id_category : parseInt(id_category),
            id_event: parseInt(id_event),
            harga : request.harga,
            stok : request.stok,
        },
        select: {
            id_tiket: true,
            harga: true,
            stok: true,
        }
    });
    console.log("HASIL ID TIKET", createdTiket)

    // Generate QR code sebanyak stok
    const qrData = Array.from({ length: createdTiket.stok }, () => ({
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
    console.log("ID EVENT", id_event);
    const id_e = parseInt(id_event);
    return prismaClient.tiket.findMany({
        where : {
            id_event: id_e
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

const getAdmin = async () => {

    return prismaClient.tiket.findMany({
        
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
                    waktu: true,
                    image : true
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

    return prismaClient.tiket.update({
        where: {
            id_tiket: parseInt(id_tiket)
        },
        data: {
            stok: request
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

const remove = async (id_tiket, id_event) => {
    id_tiket = await checkTiketMustExists(id_tiket);

    await prismaClient.qR.deleteMany({
        where: {
            id_tiket: id_tiket
        }
    });
    await prismaClient.tiket.deleteMany({
        where : {
            id_tiket : id_tiket, 
            OR : {
                id_event : parseInt(id_event)
            }
        }
    });
    return await prismaClient.event.delete({
        where : {
            id_event : parseInt(id_event)
        }
    });
    
};

// const list = async (id_event) => {
//     return prismaClient.tiket.findMany({
//         where: {
//             id_event: parseInt(id_event)
//         },
//         select: {
//             id_tiket: true,
//             name: true,
//             price: true,
//         }
//     });
// };

export default {
    create,
    get,
    update,
    remove,
    // list,
    getAll,
    getAdmin
};
