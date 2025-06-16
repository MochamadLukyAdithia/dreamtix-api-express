import adminService from "../service/admin-service.js";
const login = async (req, rest, next ) => {
    try{
        const result = await adminService.login(req.body)
        rest.status(200).json({
                data: result
        });
    } catch (e){
        next(e)
    }
}
const register = async (req, rest, next) => {
    try {
        const result = await adminService.register(req.body);
        rest.status(201).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}
const get = async (req, res, next) => {
    try {
        const username = req.admin.username;
        console.log("Username from request:", username);
        const result = await adminService.get(username);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}
const update = async ()=>{}
export default{
    login,
    register,
    get, update
}