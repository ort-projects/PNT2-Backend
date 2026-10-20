import express from "express"
import type { RequestHandler } from "express";
import type AdminController from "../controllers/adminController.js";

export default function createAdminRoutes(adminController: AdminController, adminAuth: RequestHandler){
    const router = express.Router();
    
    router.use(adminAuth);
    router.get("/dashboard", (req, res) => adminController.getDashboardData(req, res));
    
    return router;
}
