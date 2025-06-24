import {
  createBannerValidation,
  updateBannerValidation,
} from "../validation/banner-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

// Buat banner baru
const create = async ( request) => {
  const banner = validate(createBannerValidation, request);
  console.log("Banner:", banner);

  return prismaClient.banner.create({
    data: banner,
    select: {
      id_banner: true,
      image: true,
    },
  });
};

// Update banner (menggunakan id_banner dari body request)
const update = async (request) => {
  const banner = validate(updateBannerValidation, request);

  const existing = await prismaClient.banner.findUnique({
    where: { id_banner: banner.id_banner },
  });

  if (!existing) {
    throw new ResponseError(404, "Banner tidak ditemukan");
  }

  return prismaClient.banner.update({
    where: { id_banner: banner.id_banner },
    data: {
      image: banner.image,
    },
    select: {
      id_banner: true,
      image: true,
    },
  });
};

// Ambil semua banner
const getAll = async () => {
  return prismaClient.banner.findMany({
    select: {
      id_banner: true,
      image: true,
    },
  });
};

// Hapus banner berdasarkan ID
const remove = async (id_customer, id_banner) => {
  const existing = await prismaClient.banner.findUnique({
    where: { id_banner: parseInt(id_banner) },
  });

  if (!existing) {
    throw new ResponseError(404, "Banner tidak ditemukan");
  }

  return prismaClient.banner.delete({
    where: {
      id_banner: parseInt(id_banner),
    },
  });
};

export default {
  create,
  update,
  getAll,
  remove,
};
