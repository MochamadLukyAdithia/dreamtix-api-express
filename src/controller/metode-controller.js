import metodeService from "../service/metode-service.js";
const create = async (req, res, next) => {
  try {
    const metode = req.body;
    console.log("Ini Data Metode", metode);
    const result = await metodeService.create(metode);
    res.status(200).json({
        data:result,
    });
  } catch (e) {
    console.log("Error", e);
    next(e);
  }
};
const getAll = async (req, res, next) => {
  try{

    const result = await metodeService.getAll();
    res.status(200).json({
      data : result,
    });
  } catch(e){
    console.log("Error", e);
    next(e);
  }
}
export default{
    create,
    getAll
}
