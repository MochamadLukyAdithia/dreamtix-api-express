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
export default {
    create
}