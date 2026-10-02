import express from "express"

function createCarritosRoutes(carritosController){
    const router = express.Router();
    
    router.get("/:id", (req, res) => carritosController.getCart(req, res));
    router.post("/", (req, res) => carritosController.createCart(req, res));
    
    return router;
}

export default createCarritosRoutes;