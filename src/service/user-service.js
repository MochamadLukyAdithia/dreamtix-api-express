import {validate} from "../validation/validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import bcrypt from "bcrypt";
import { generateToken } from "../helper/jwtHelper.js";

import {v4 as uuid} from "uuid";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.customer.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.customer.create({
        data: user,
        select: {
            username: true,
    
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.customer.findUnique({
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
        type: "customer"
    });
    return prismaClient.customer.update({
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
  username = validate(getUserValidation, username);
  console.log("get user", username);

  let user = await prismaClient.customer.findUnique({
    where: { username },
    select: {
      username: true,
      email: true,
      id_customer: true,
    },
  });
  console.log("user found in customer", user);

  if (!user) {
    const admin = await prismaClient.admin.findUnique({
      where: { username },
      select: {
        username: true,
        id_admin: true,
      },
    });
    console.log("user found in admin", admin);
    user = admin; // assign admin ke user supaya return konsisten
  }

  return user; // bisa user dari customer atau admin, atau null kalau tidak ditemukan
};

const update = async (request, id_customer) => {
    const user = validate(updateUserValidation, request);
    const totalUserInDatabase = await prismaClient.customer.count({
        where: {
            username: user.username
        }
    });
    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "user is not found");
    }
    const data = {};
    if (user.username) {
        data.username = user.username;
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.customer.update({
        where: {
            id_customer: id_customer
        },
        data: data,
        select: {
            username: true,
            email: true
        }
    });
}

const logout = async (id_customer) => {
    console.log("USERNAME",id_customer);

    const user = await prismaClient.customer.findUnique({
        where: {
            id_customer: parseInt(id_customer)
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.customer.update({
        where: {
            id_customer: parseInt(id_customer)
        },
        data: {
            token: null
        },
        select: {
            username: true,
            id_customer: true,
            token: true
            
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    logout
}
