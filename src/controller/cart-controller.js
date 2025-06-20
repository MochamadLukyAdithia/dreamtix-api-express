import cartService from "../service/cart-service.js";
import userService from "../service/user-service.js";

const create = async (req, res, next) => {
  try {
    const customer = req.customer;
    const id_customer = await userService.get(customer.username);
    const request = req.body;
    console.log("ID Customer:", id_customer);
    console.log("Request body:", request);
    const result = await cartService.create(id_customer, request);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};
const getAll = async (req, res, next) => {
  try {
    const username = req.customer.username;
    const id_user = await userService.get(username);
    console.log("ID CUSTOMER", id_user.id_customer);
    const result = await cartService.getAll(id_user.id_customer);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    const username = req.customer.username;
    const id_customer = await userService.get(username);
    const id_cart = req.params.id_cart;
    const request = req.body;
    const result = await cartService.update(request, id_cart, id_customer.id_customer);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};
const hapus = async (req, res, next) => {
  try {
    const customer = req.customer;
    const id_cart = req.params.id_cart;
    const id_customer = await userService.get(customer.username);
    const result = await cartService.hapus(id_cart, id_customer.id_customer);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};
const deleteAll = async (req, res, next) => {
  try {
    const customer = req.customer;
    const id_customer = await userService.get(customer.username);
    const result = await cartService.deleteAll(id_customer.id_customer);
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
  getAll,
  update,
  hapus,
  deleteAll,
};
