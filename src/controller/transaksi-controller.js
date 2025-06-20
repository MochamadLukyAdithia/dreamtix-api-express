import { logger } from "../application/logging.js";
import transaksiService from "../service/transaksi-service.js";
const create = async (req, res, next) => {
  try {
    const id_pesan = req.params.id_pesan;
    console.log(id_pesan);
    const transaksi = req.body;
    console.log(transaksi);
    const result = await transaksiService.create(id_pesan, transaksi);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    logger.error("Error creating transaksi: ", e);
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    const id_pesanan = req.params.id_pesanan;
    const id_transaksi = req.params.id_transaksi;
    const transaksi = req.body;
    const result = await transaksiService.update(
      id_pesanan,
      id_transaksi,
      transaksi
    );
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};
const get = async (req, res, next) => {
   try {
    const id_pesanan = req.params.id_pesanan;
    const id_transaksi = req.params.id_transaksi;
    const transaksi = req.body;
    const result = await transaksiService.get(
      id_pesanan,
      id_transaksi
    );
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};
const getAll = async (req, res, next) => {
   try {
    const result = await transaksiService.getAll(
    );
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};
export default {
  create,
  update,
  get,
  getAll,
};
