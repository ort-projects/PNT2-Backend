import express from "express"
import type ProductosController from "../controllers/productosController.js";

function createProductosRoutes(productosController: ProductosController){
    const router = express.Router();

    router.get("/", (req, res) => productosController.getProducts(req, res));
    router.get("/:id", (req, res) => productosController.getProduct(req, res));
    
    return router;
}

export default createProductosRoutes;
