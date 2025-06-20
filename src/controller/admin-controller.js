
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

const update = async (req, res, next)=>{
    try{
    const request = req.body;
    const id_admin = req.params.id_admin;
    console.log("ID ADMIN",id_admin);
    const result = await adminService.update(request, id_admin);
    res.status(200).json({
        data: result
    });
}catch (e) {
    console.log("ERROR", e),
    next(e);
}
}

export default{
    login,
    register,
    get, update
}