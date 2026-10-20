import type { Request, Response } from "express";
import type { AdminUseCases } from "../useCases/admin/makeAdminUseCases.js";

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
}
