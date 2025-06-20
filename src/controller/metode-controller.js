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
const update = async (req, res, next) => {
  try{
  const request = req.body;
  const id_metode = req.params.id_metode
  const result = await metodeService.update(id_metode, request)
   res.status(200).json({
      data : result,
    });
  }catch (e){
    console.log("ERROR", e);
    next(e);
  }
}
const remove = async(req, res, next)=> {
   try{
  const id_metode = req.params.id_metode;
  const result = await metodeService.remove(id_metode);
  res.status(200).json({
    data : result
  });
  } catch (e)
{
  console.log("ERROR", e);
    next(e); 
}
}
const get = async(req, res, next)=> {
  try{
  const id_metode = req.params.id_metode;
  const result = await metodeService.get(id_metode);
  res.status(200).json({
    data : result
  });
  } catch (e)
{
  console.log("ERROR", e);
    next(e); 
}
    
}
export default{
    create,
    getAll,
    update,
    remove,
    get
}
