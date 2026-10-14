import express from "express"

export default function createAdminRoutes(adminController, adminAuth){
    const router = express.Router();
    
    router.use(adminAuth);
    router.get("/dashboard", (req, res) => adminController.getDashboardData(req, res));
    
    return router;
}
