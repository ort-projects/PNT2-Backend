import express from "express"
import type CarritosController from "../controllers/carritosController.js";

function createCarritosRoutes(carritosController: CarritosController){
    const router = express.Router();
    
    router.get("/:id", (req, res) => carritosController.getCart(req, res));
    router.post("/", (req, res) => carritosController.createCart(req, res));
    
    return router;
}

export default createCarritosRoutes;
