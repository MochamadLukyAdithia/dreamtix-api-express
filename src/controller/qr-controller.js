import { logger } from "../application/logging.js";
import qrService from "../service/qr-service.js";
const getAll = async (req, res, next) => {
  try {
   const id_tiket = req.params.id_tiket;
console.log("ID Tiket:", id_tiket);

const result = await qrService.getAll(id_tiket);

// Tambahkan field `qr_url` ke setiap data
const formattedResult = result.map(qr => ({
  ...qr,
  qr_url: `http://api.qrserver.com/v1/create-qr-code/?data=${qr.kode_qr}&size=200x200`
}));

res.status(200).json({ data: formattedResult });

  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    const kode_qr = req.params.kode_qr;
    console.log("Kode QR:", kode_qr);
    const result = await qrService.update(kode_qr);
    res.status(200).json({ data: result });
  } catch (e) {
    logger.error("Error", e);
    next(e);
  }
};
const sender = async (req, res, next) => {
  try {
    const id_tiket = req.params.id_tiket;
    console.log("ID Tiket:", id_tiket);
    const qr = await qrService.getAll(id_tiket);
    console.log("QR Data:", qr);
    const result = await qrService.sender(qr.is_used);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};
const getMany = async (req, res, next) => {
  try {
    const request = req.body;
    const param = req.params;
    const result = await qrService.getMany(param.quantity, param.id_tiket);
    
// Tambahkan field `qr_url` ke setiap data
const formattedResult = result.map(qr => ({
  ...qr,
  qr_url: `http://api.qrserver.com/v1/create-qr-code/?data=${qr.kode_qr}&size=200x200`
}));
    res.status(200).json({
      data: formattedResult,
    });
  } catch (e) {
    logger.error("Error", e);
    next(e);
  }
};
export default {
  getAll,
  update,
  sender,
  getMany,
};
