import express from "express";
import userController from "../controller/user-controller.js";
import eventController from "../controller/events-controller.js";
import tiketController from "../controller/tikets-controller.js";
// import {authMiddleware} from "../middleware/auth-middleware.js";
import adminController from "../controller/admin-controller.js";
import { authenticate } from "../helper/jwtHelper.js";
import categoryController from "../controller/category-controller.js";
import pesananController from "../controller/pesanan-controller.js";
import cartController from "../controller/cart-controller.js";
import qrController from "../controller/qr-controller.js";
import transaksiController from "../controller/transaksi-controller.js";
import metodeController from "../controller/metode-controller.js";
import metodeService from "../service/metode-service.js";

const userRouter = new express.Router();
// userRouter.use(authMiddleware);

// Customer
userRouter.get('/api/users/', authenticate ,userController.get);
userRouter.patch('/api/users/:id_customer', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Admin    
userRouter.get('/api/admin/', authenticate,adminController.get);
userRouter.post('/api/admin/login', adminController.login);
userRouter.patch('/api/admin/:id_admin', adminController.update);

// Cart
userRouter.post('/api/cart',authenticate, cartController.create);
userRouter.get("/api/cart", authenticate, cartController.getAll);
userRouter.patch('/api/cart/:id_cart', authenticate, cartController.update);
userRouter.delete("/api/cart/:id_cart", authenticate, cartController.hapus);   
userRouter.delete("/api/cart/",authenticate, cartController.deleteAll);

// Event
userRouter.post('/api/events',authenticate ,eventController.create);
userRouter.get('/api/events', eventController.getAll);
userRouter.get('/api/events/:id_event', authenticate, eventController.get);
userRouter.patch('/api/events/:id_event', authenticate, eventController.update);
userRouter.delete("/api/events/:id_event", authenticate, eventController.remove);

// Category
userRouter.post('/api/category/', categoryController.create);
userRouter.get('/api/category/:id_category',categoryController.get);
userRouter.get('/api/category/', categoryController.getAll);
userRouter.patch("/api/category/:id_category", categoryController.update);
userRouter.delete("api/category/:id_category", categoryController.remove);

// Pesanan
userRouter.post('/api/pesanan/',authenticate, pesananController.create);
userRouter.get('/api/pesanan',authenticate, pesananController.getAll);
userRouter.get("/api/pesanan/:id_pesan", pesananController.get);
userRouter.patch("/api/pesanana/:id_pesan", pesananController.update)

// Qr
userRouter.get('/api/events/:id_event/tikets/:id_tiket/qr/sender', qrController.sender);
userRouter.get('/api/events/:id_event/tikets/:id_tiket/qr', qrController.getAll);
userRouter.get('/api/events/:id_event/tikets/:id_tiket/qr/many', qrController.getMany);
userRouter.patch('/api/events/:id_event/tikets/:id_tiket/qr/:kode_qr', qrController.update);

// Tiket
userRouter.post('/api/events/:id_event/tikets', tiketController.create);
userRouter.get('/api/events/:id_event/tikets/:id_tiket', tiketController.get);
userRouter.put('/api/events/:id_event/tikets/:id_tiket', tiketController.update);
userRouter.get("/api/events/:id_event/tikets/", tiketController.getAll);
userRouter.delete('/api/events/:id_event/tikets/:id_tiket', tiketController.remove);

// Transaksi
userRouter.post("/api/pesanan/:id_pesanan/transaksi", transaksiController.create);
userRouter.patch('/api/pesanan/:id_pesanan/transaksi/:id_transaksi', transaksiController.update);
userRouter.get("/api/pesanan/:id_pesanan/transaksi/:id_transaksi", transaksiController.get);
userRouter.get("/api/pesanan/:id_pesanan/transaksi/",authenticate, transaksiController.getAll);

// Metode
userRouter.post("/api/metode", metodeController.create);
userRouter.get("/api/metode", metodeController.getAll);
userRouter.get("/api/metode/:id_metode", metodeController.get);
userRouter.patch("/api/metode/:id_metode", metodeController.update);
userRouter.delete("/api/metode/:id_metode", metodeController.remove);

export {
    userRouter
}
