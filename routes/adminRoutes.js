import express from "express"

function createAdminRoutes(adminController){
    const router = express.Router();
    
    router.get("/dashboard", (req, res) => adminController.getDashboardData(req, res));
    
    return router;
}

export default createAdminRoutes;