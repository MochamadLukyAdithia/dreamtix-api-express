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
const update = async() =>{}
export default{
    create,
    update
}
