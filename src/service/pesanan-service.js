import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { createPesananValidation } from "../validation/pesanan-validation.js";

const create = async (id_customer, request) => {
    console.log("id_customer:", id_customer);
    const pesanan = validate(createPesananValidation, request);
    console.log("Pesanan:", pesanan);
    pesanan.id_customer = parseInt(id_customer);
    return prismaClient.pemesanan.create({
        data: {
            id_customer: pesanan.id_customer,
            tanggal: new Date(pesanan.tanggal),
        },
        select: {
            id_pesan: true,
            id_customer: true,
            tanggal: true,
        }
    });
}
const getAll = async ( id_customer)=> {
    console.log(id_customer);
    return prismaClient.pemesanan.findMany({
        where : {
            id_customer: parseInt(id_customer)
        },
        select : {
            id_customer: true,
            id_pesan: true,
            tanggal: true,
            detailPemesanan: {
                select : {
                    id_pesan: true,
                    quantity: true,
                    total: true,
                    id_tiket : true,
                    tiket : {
                        select : {
                            id_category: true,
                            harga : true,
                            stok: true,
                            category: {
                                select: {
                                    nama: true,
                                    posisi: true
                                }
                            }

                        }
                    }
                }
            },
            
        }
    });
}
const get = async(id_pesan, id_customer) => {
    return prismaClient.pemesanan.findFirst({
        where: {
            id_customer: parseInt(id_customer),
            AND : {
                id_pesan: parseInt(id_pesan)
            }
        }
        ,select: {
            id_customer: true,
            id_pesan: true,
            tanggal: true
        }
    });
}
const update = async (id_pesan, pesanan) => {
    return prismaClient.pemesanan.update({
        where: {
            id_pesan : parseInt(id_pesan)
        },
        data : pesanan
    })
}
export default {
    create,
    getAll,
    get,
    update 
}