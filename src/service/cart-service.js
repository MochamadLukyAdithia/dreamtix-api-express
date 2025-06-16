import { createCartValidation } from "../validation/cart-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
const create = async (id_customer, request) => {
    const cart = validate(createCartValidation, request);
    console.log("Cart:", cart);
    console.log("id_customer:", id_customer);
    cart.id_customer = parseInt(id_customer);
    return prismaClient.cart.create({
        data: cart,
        select: {
            id_cart: true,
            id_user: true,
            id_tiket,
            jumlah: true,
            total: true
        }
    });
};
export default{
    create
}