import { createTransaksiValidation } from "../validation/transaksi-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";

const create = async (id_pesan, request) => {
  const transaksi = validate(createTransaksiValidation, request);
  transaksi.id_pesan = parseInt(id_pesan);

  // Convert waktu to a proper Date object if it's a string
  if (typeof transaksi.waktu === 'string') {
    transaksi.waktu = new Date(transaksi.waktu); // ISO 8601 recommended
  }

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

const update = async(id_pesanan, id_transaksi, request) =>{
  return prismaClient.transaksi.update({
    where : {
      id_transaksi : parseInt(id_transaksi),
      AND : {
        id_pesan: parseInt(id_pesanan)
      }
    }, 
    data: request,
    
  })
}
const get = async(id_pesanan, id_transaksi)=> {
  return prismaClient.transaksi.findFirst({
    where: {
      id_pesan: parseInt(id_pesanan),
      AND: {
        id_transaksi: parseInt(id_transaksi)
      }
    }, 
    select : {
      id_metode: true,
      id_transaksi : true,
      id_pesan : true,
      status : true
    }
  });
}
const getAll = async(id_customer)=> {
  return prismaClient.pemesanan.findMany(
    {
      where : {
        id_customer: parseInt(id_customer)
      },
      select : {
        id_customer: true,
        id_pesan: true,
        tanggal : true,
        transaksis : {
          select : {
            id_metode : true,
            status : true,
            metodePembayaran : {
              select : {
                nama : true,
                provider : true,
                nomor : true
              }
            }
          }
        }
      }
    }
  )
}
export default {
  create,update, get, getAll
};
