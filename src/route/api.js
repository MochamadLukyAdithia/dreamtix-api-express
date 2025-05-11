import express from "express";
import userController from "../controller/user-controller.js";
import eventController from "../controller/events-controller.js";
import tiketController from "../controller/tikets-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User management API
//  */

// /**
//  * @swagger
//  * /api/users:
//  *   post:
//  *     summary: Register a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - username
//  *               - password
//  *               - name
//  *             properties:
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *               name:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: User registered successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     username:
//  *                       type: string
//  *                     name:
//  *                       type: string
//  *       400:
//  *         description: Username already registered
//  */

// /**
//  * @swagger
//  * /api/users/login:
//  *   post:
//  *     summary: Login user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - username
//  *               - password
//  *             properties:
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Login success
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     token:
//  *                       type: string
//  *       400:
//  *         description: Username or password wrong
//  */

// /**
//  * @swagger
//  * /api/users/current:
//  *   patch:
//  *     summary: Update current user
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: false
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Update success
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     username:
//  *                       type: string
//  *                     name:
//  *                       type: string
//  *       400:
//  *         description: Name length max 100
//  */

// /**
//  * @swagger
//  * /api/users/current:
//  *   get:
//  *     summary: Get current user info
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved user data
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     username:
//  *                       type: string
//  *                     name:
//  *                       type: string
//  *       401:
//  *         description: Unauthorized
//  */

// /**
//  * @swagger
//  * /api/users/logout:
//  *   delete:
//  *     summary: Logout user
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Logout success
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: string
//  *                   example: OK
//  *       401:
//  *         description: Unauthorized
//  */

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// /**
//  * @swagger
//  * tags:
//  *   name: Contacts
//  *   description: API untuk mengelola kontak pengguna
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Contact:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: integer
//  *         first_name:
//  *           type: string
//  *         last_name:
//  *           type: string
//  *         email:
//  *           type: string
//  *         phone:
//  *           type: string
//  *     ContactInput:
//  *       type: object
//  *       required:
//  *         - first_name
//  *         - last_name
//  *         - email
//  *         - phone
//  *       properties:
//  *         first_name:
//  *           type: string
//  *         last_name:
//  *           type: string
//  *         email:
//  *           type: string
//  *         phone:
//  *           type: string
//  *     Paging:
//  *       type: object
//  *       properties:
//  *         page:
//  *           type: integer
//  *         total_page:
//  *           type: integer
//  *         total_item:
//  *           type: integer
//  *     ErrorResponse:
//  *       type: object
//  *       properties:
//  *         errors:
//  *           type: string
//  */

// /**
//  * @swagger
//  * /api/contacts:
//  *   post:
//  *     summary: Create a contact
//  *     tags: [Contacts]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ContactInput'
//  *     responses:
//  *       200:
//  *         description: Contact created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   $ref: '#/components/schemas/Contact'
//  *       400:
//  *         description: Validation error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  */

// /**
//  * @swagger
//  * /api/contacts/{id}:
//  *   put:
//  *     summary: Update a contact by ID
//  *     tags: [Contacts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ContactInput'
//  *     responses:
//  *       200:
//  *         description: Contact updated
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   $ref: '#/components/schemas/Contact'
//  *       400:
//  *         description: Validation error
//  */

// /**
//  * @swagger
//  * /api/contacts/{id}:
//  *   get:
//  *     summary: Get a contact by ID
//  *     tags: [Contacts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Contact retrieved
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   $ref: '#/components/schemas/Contact'
//  *       404:
//  *         description: Contact not found
//  */

// /**
//  * @swagger
//  * /api/contacts:
//  *   get:
//  *     summary: Search contacts
//  *     tags: [Contacts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: name
//  *         schema:
//  *           type: string
//  *         description: Search by first or last name
//  *       - in: query
//  *         name: email
//  *         schema:
//  *           type: string
//  *       - in: query
//  *         name: phone
//  *         schema:
//  *           type: string
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           default: 1
//  *       - in: query
//  *         name: size
//  *         schema:
//  *           type: integer
//  *           default: 10
//  *     responses:
//  *       200:
//  *         description: Contacts found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Contact'
//  *                 paging:
//  *                   $ref: '#/components/schemas/Paging'
//  */

// /**
//  * @swagger
//  * /api/contacts/{id}:
//  *   delete:
//  *     summary: Delete contact by ID
//  *     tags: [Contacts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Contact deleted
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: string
//  *                   example: OK
//  *       404:
//  *         description: Contact not found
//  */

// Event API
userRouter.post('/api/events', eventController.create);
userRouter.get('/api/events/', eventController.getCurrent);
userRouter.get('/api/events/:id_event', eventController.get);
userRouter.put('/api/events/:id_event', eventController.update);
userRouter.delete('/api/events/:id_event', eventController.remove);
userRouter.get('/api/events', eventController.search);

// Tikets API
userRouter.post('/api/events/:id_event/tikets', tiketController.create);
userRouter.get('/api/events/:id_event/tikets/:id_tiket', tiketController.get);
userRouter.put('/api/events/:id_event/tikets/:id_tiket', tiketController.update);
userRouter.delete('/api/events/:id_event/tikets/:id_tiket', tiketController.remove);
userRouter.get('/api/events/:id_event/tikets', tiketController.list);



export {
    userRouter
}
