import categoryService from "../service/category-service.js";
import eventService from "../service/event-service.js";
import tiketService from "../service/tiket-service.js";

const create = async (req, res, next) => {
  try {
    const request = req.body;
    console.log("INI REQUEST", request);
    const event = await eventService.create(1 , request)
    const category = await categoryService.filter(request.nama)
    console.log("EVENT:", event);
    console.log("CATEGORY:", category);
    const result = await tiketService.create(category.id_category,event.id_event, request);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const tiket = req.params.id_tiket;
    console.log("ID Tiket:", tiket);
    const result = await tiketService.get(tiket);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const id_tiket = req.params.id_tiket;
    const request = req.body;
    const result = await tiketService.update(id_tiket, request);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const id_tiket = req.params.id_tiket;
    const id_event = req.params.id_event;
    await tiketService.remove(id_tiket, id_event);

    res.status(200).json({ data: "OK" });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const id_event = req.params.id_event;
    const result = await tiketService.getAll(id_event);
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
    const result = await tiketService.getAdmin();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    console.log("ERROR", e);
    next(e);
  }
};

// const list = async (req, res, next) => {
//   try {
//     const id_event = req.params.id_event;
//     const result = await tiketService.list(id_event);

//     res.status(200).json({ data: result });
//   } catch (e) {
//     next(e);
//   }
// };

export default {
  create,
  get,
  update,
  remove,
  // list,
  getAll,
  getAdmin
};
