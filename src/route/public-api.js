import express from "express";
import userController from "../controller/user-controller.js";
import healthController from "../controller/health-controller.js";
import adminController from "../controller/admin-controller.js";

const publicRouter = new express.Router();
publicRouter.post('/api/users/register', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.post('/api/admin/login', adminController.login);
publicRouter.post('/api/admin/register', adminController.register);
publicRouter.get('/ping', healthController.ping);

export {
    publicRouter
}
