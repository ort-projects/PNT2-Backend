import express from "express"

function createProductosRoutes(productosController){
    const router = express.Router();

    router.get("/", (req, res) => productosController.getProducts(req, res));
    router.get("/:id", (req, res) => productosController.getProduct(req, res));
    
    return router;
}

export default createProductosRoutes;