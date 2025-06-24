import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}
const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}
const get = async (req, res, next) => {
    try {
        const username = req.customer.username;
        console.log("Username from request:", username);
        const result = await userService.get(username);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.customer.username;
        const id_customer = await userService.get(username)
        const request = req.body;
        request.username = username;

        const result = await userService.update(request, id_customer.id_customer);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
            const customer = req.customer;
            const id_customer = await userService.get(customer.username);
          await userService.logout(id_customer.id_customer);
     
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        console.log("ERROR", $e)
        next(e);
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
}
