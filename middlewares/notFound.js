import AppError from "../errors/AppError.js";
function notFound(req, res, next){
    return next(new AppError("RUTA_NO_ENCONTRADA", `No se encontro la ruta ${req.url}`, 404))
}

export default notFound;