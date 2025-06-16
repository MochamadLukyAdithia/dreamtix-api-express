import cartService from "../service/cart-service.js";

import userService from "../service/user-service.js";

const create = async (req, res, next) => {
    try {
        const id_tiket = req.params.id_tiket;
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
const get = async ()=>{}
const getAll = async ()=>{}
const update = async ()=>{}
const hapus = async ()=>{}
const deleteAll = async ()=>{}

export default {
    create,
    get,
    getAll,
    update,
    hapus,
    deleteAll
};