import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.js";
function notFound(req: Request, res: Response, next: NextFunction){
    return next(new AppError("RUTA_NO_ENCONTRADA", `No se encontro la ruta ${req.url}`, 404))
}

export default notFound;