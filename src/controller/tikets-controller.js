import tiketService from "../service/tiket-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const id_event = req.params.id_event;
        const result = await tiketService.create(id_event, request);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const id_tiket = req.params.id_tiket;
        const result = await tiketService.get(id_tiket);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const id_tiket = req.params.id_tiket;
        const request = req.body;
        const result = await tiketService.update(id_tiket, request);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const id_tiket = req.params.id_tiket;
        await tiketService.remove(id_tiket);

        res.status(200).json({ data: "OK" });
    } catch (e) {
        next(e);
    }
};

const list = async (req, res, next) => {
    try {
        const id_event = req.params.id_event;
        const result = await tiketService.list(id_event);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export default {
    create,
    get,
    update,
    remove,
    list
};
