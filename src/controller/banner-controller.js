import bannerService from "../service/banner-service.js";
import userService from "../service/user-service.js";

// Create Banner
const create = async (req, res, next) => {
  try {
    const request = req.body;

    console.log("Request Body:", request);

    const result = await bannerService.create( request);
    res.status(201).json({ data: result });
  } catch (e) {
    console.error("❌ Error create banner:", e);
    next(e);
  }
};

// Get All Banner
const getAll = async (req, res, next) => {
  try {
    const result = await bannerService.getAll();
    res.status(200).json({ data: result });
  } catch (e) {
    console.error("❌ Error getAll banner:", e);
    next(e);
  }
};

// Update Banner
const update = async (req, res, next) => {
  try {
    const customer = req.customer;
    const id_customer = await userService.get(customer.username);
    const request = req.body;

    const result = await bannerService.update(id_customer, request);
    res.status(200).json({ data: result });
  } catch (e) {
    console.error("❌ Error update banner:", e);
    next(e);
  }
};

// Delete Banner by ID
const remove = async (req, res, next) => {
  try {
    const customer = req.customer;
    const id_customer = await userService.get(customer.username);
    const { id_banner } = req.params;

    const result = await bannerService.remove(id_customer, id_banner);
    res.status(200).json({ data: result });
  } catch (e) {
    console.error("❌ Error delete banner:", e);
    next(e);
  }
};

export default {
  create,
  getAll,
  update,
  remove,
};
