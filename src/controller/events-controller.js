import eventService from "../service/event-service.js";
import {logger} from "../application/logging.js";

import adminService from "../service/admin-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body
        const result = await eventService.create(1, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}
const getAll = async (req, res, next) => {
    try {
        // const admin = req.admin;
        // console.log("admin", admin);
        // const data_admin = await adminService.get(admin.username);
        // console.log("id_admin", data_admin.id_admin);
        const result = await eventService.getAll();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}
const get = async (req, res, next) => {
    try {
        const admin = req.admin;
        console.log("admin", admin);
        const id_event = req.params.id_event;
        console.log("id_event", id_event);
        const data_admin = await adminService.get(admin.username);
        console.log("id_admin", data_admin.id_admin);
        const result = await eventService.get(data_admin.id_admin, id_event);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}
const update = async (req, res, next) => {
    try {
        const id_event = req.params.id_event;
        const request = req.body;

        const result = await eventService.update(id_event, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const admin = req.admin;
        const id_event = req.params.id_event;
        const id_admin = await adminService.get(admin.username);
        const result = await eventService.remove(id_event, id_admin.id_admin)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const admin = req.admin;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        };
        const result = await eventService.search(admin, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    getAll,
    get,
    update,
    remove,
    search
}
