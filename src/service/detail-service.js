import { createDetailValidation } from "../validation/detail-validation.js";
import { validate} from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createPesananValidation } from "../validation/pesanan-validation.js";
const create = async(id_pesan, request) => {
    const detail = validate(createPesananValidation, request);
    detail.id_pesan = parseInt(id_pesan);
    return prismaClient.detailPemesanan.create({
        data: {
            id_pesan : detail.id_pesan,
            id_tiket : detail.id_tiket,
            quantity : detail.quantity,
            total : detail.total
        },
        select : {
            id_pesan : true,
            id_tiket: true,
            total : true,
            quantity: true,
            pemesanan : {
                select : {
                    id_pesan: true,
                    tanggal : true
                }
            }
        }
    });
}
export default{
    create
}