import {
  createCartValidation,
  updateCartValidation,
} from "../validation/cart-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import { request } from "express";
const create = async (id_customer, request) => {
  const cart = validate(createCartValidation, request);
  console.log("Cart:", cart);
  console.log("id_customer:", id_customer.id_customer);
  cart.id_user = parseInt(id_customer.id_customer);
  console.log("Cart:", cart);
  return prismaClient.cart.create({
    data: cart,
    select: {
      id_cart: true,
      id_user: true,
      id_tiket: true,
      jumlah: true,
      total: true,
    },
  });
};
const update = async (request, id_cart, id_customer) => {
  console.log("ID CUSTOMER", id_customer);
  const cart = validate(updateCartValidation, request);
  return prismaClient.cart.updateMany({
    where: {
        id_cart: parseInt(id_cart),
        id_user: parseInt(id_customer)
    },
    data: cart
  });
};
const getAll = async (id_user) => {
  const id_u = parseInt(id_user);
  return prismaClient.cart.findMany({
    where: {
      id_user: id_u,
    },
    select: {
      id_cart: true,
      id_user: true,
      id_tiket: true,
      jumlah: true,
      total: true,
    },
  });
};
const hapus = async (id_cart, id_customer) => {
  return prismaClient.cart.delete({
    where: {
      id_cart: parseInt(id_cart),
      id_user: parseInt(id_customer),
    },
  });
};
const deleteAll = async (id_customer) => {
  const id_c = parseInt(id_customer);
  return prismaClient.cart.deleteMany({
    where: {
      id_user: id_c,
    },
  });
};
export default {
  create,
  update,
  hapus,
  deleteAll,
  getAll
};
