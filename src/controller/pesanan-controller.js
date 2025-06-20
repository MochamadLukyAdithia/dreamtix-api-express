import pesananService from "../service/pesanan-service.js";
import { logger } from "../application/logging.js";
import userService from "../service/user-service.js";
import detailService from "../service/detail-service.js";
import tiketService from "../service/tiket-service.js";
const create = async (req, res, next) => {
  try {
    const request = req.body;
    const customer = req.customer;
    console.log("id_user:", customer);
    const cust = await userService.get(customer.username);
    console.log("CUSTOMER ID:", cust.id_customer);
    const result = await pesananService.create(cust.id_customer, request);
    console.log("ID PESAN", result.id_pesan);
    const result2 = await detailService.create(result.id_pesan, request);
    const tiket = await tiketService.get(request.id_tiket);
    await tiketService.update(request.id_tiket, tiket.stok - request.quantity);
    const tiket2 = await tiketService.get(request.id_tiket);
    res.status(200).json({
      data: result2,
      tiket: tiket2,
    });
  } catch (e) {
    logger.error("Error creating pesanan:", e);
    next(e);
  }
};
const get = async (req, res, next) => {
    try {
        const username = req.customer.username;
        const id_pesan = req.params.id_pesan;
        const customer = await userService.get(username);
        const result = pesananService.get(id_pesan, customer.id_customer);
    } catch (e) {
        console.log("ERROR", e);
        next(e);
    }
};
const getAll = async (req, res, next) => {
  try {
    const username = req.customer.username;
    console.log("USERNAME" , username)
    const customer = await userService.get(username);
    const result = await pesananService.getAll(customer.id_customer);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};
const update = async (req, res, next) => {
  try{
      const id_pesanan = req.params.id_pesan;
  const pesanan = req.body;
  const result = await pesananService.update(id_pesanan, pesanan);
  res.status(200).json({
    message : "OK",
    data: result
  });
  } catch (e){
    console.log("ERROR", e);
    next(e);
  }

};
export default {
  create,
  getAll,
  get,
  update,
};
