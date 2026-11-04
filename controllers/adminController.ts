import type { Request, Response } from "express";
import type { AdminUseCases } from "../useCases/admin/makeAdminUseCases.js";
import AppError from "../errors/AppError.js";
import type { ProductoPatch } from "../types/entities.js";

export default class AdminController{
    adminUseCases: AdminUseCases;

    constructor(adminUseCases: AdminUseCases){
        this.adminUseCases = adminUseCases;
    }

    async getDashboardData(req: Request, res: Response){
        const { selectedYear } = req.query;
        const dashData = await this.adminUseCases.getDashboardData(selectedYear);
        res.status(200).json(dashData);
    }

    async patchProduct(req: Request, res: Response){
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id < 1) {
            throw new AppError("VALIDACION", "Se requiere un id de producto válido.", 400);
        }

        const product = await this.adminUseCases.updateProduct(id, req.body as ProductoPatch);
        res.status(200).json(product);
    }
}
