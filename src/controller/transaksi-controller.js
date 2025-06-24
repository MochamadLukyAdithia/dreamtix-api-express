import { logger } from "../application/logging.js";
import adminService from "../service/admin-service.js";
import transaksiService from "../service/transaksi-service.js";
import userService from "../service/user-service.js";
const create = async (req, res, next) => {
  try {
    const id_pesan = req.params.id_pesanan;
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
  
    const id_transaksi = req.params.id_transaksi;
    const transaksi = req.body;
    const result = await transaksiService.update(
   
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
    const customer = req.customer;
    console.log("username" , customer.username);
    const id_customer = await userService.get(customer.username);
    const result = await transaksiService.getAll(
      id_customer.id_customer
    );
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};
const getAdmin = async (req, res, next) => {
   try {
    //   const admin = req.admin;
    // const id_admin = await adminService.get(admin.username);
    const result = await transaksiService.getAdmin(
    );
    // if (id_admin != null) {
      res.status(200).json({
        data: result,
      });
    // }
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
  getAdmin
};
