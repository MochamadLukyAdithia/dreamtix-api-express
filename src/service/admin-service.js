import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import { loginAdminValidation,registerAdminValidation, updateAdminValidation } from "../validation/admin-validation.js";
import { request } from "express";
import { generateToken } from "../helper/jwtHelper.js";
import bcrypt from "bcrypt";

const register = async (request) => {
    const admin = validate(registerAdminValidation, request);

    const countAdmin = await prismaClient.admin.count({
        where: {
            username: admin.username
        }
    });
    if (countAdmin === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    admin.password = await bcrypt.hash(admin.password, 10);

    return prismaClient.admin.create({
        data: admin,
        select: {
            username: true,
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginAdminValidation, request);

    const user = await prismaClient.admin.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = generateToken({
        username: user.username,
        type : "admin"
    });
    return prismaClient.admin.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
}
const get = async (username) => {
    console.log("Username:", username);
    const admin = await prismaClient.admin.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            email: true,
            id_admin: true,
        }
    });

    if (!admin) {
        throw new ResponseError(404, "Admin not found");
    }

    return admin;
}
const update = async (request, id_admin) => {
    const admin = validate(updateAdminValidation, request);
    const id_ad = parseInt(id_admin);
    admin.password = await bcrypt.hash(admin.password, 10);
    return prismaClient.admin.update({
        where: {
            id_admin: id_ad
        },
        data : admin,
        select: {
            id_admin: true,
            username: true,
            password:true
        }
    });
}

export default{
    login,
    register,
    get,
    update
}