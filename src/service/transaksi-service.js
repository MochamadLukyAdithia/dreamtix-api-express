import { createTransaksiValidation } from "../validation/transaksi-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";

const create = async (id_pesan, request) => {
  const transaksi = validate(createTransaksiValidation, request);
  transaksi.id_pesan = parseInt(id_pesan);
  return prismaClient.transaksi.create({
    data: transaksi,
    select: {
      id_metode: true,
      id_pesan: true,
      status: true,
      waktu: true
    },
  });
};
export default {
  create,
};
