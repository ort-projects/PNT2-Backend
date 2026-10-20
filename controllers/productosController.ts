import type { Request, Response } from "express";
import type { ProductosUseCases } from "../useCases/productos/makeProductosUseCases.js";

class ProductosController{
    productosUseCases: ProductosUseCases;

    constructor(productosUseCases: ProductosUseCases){
        this.productosUseCases = productosUseCases;
    }

    async getProducts(req: Request, res: Response){
        const products = await this.productosUseCases.getProducts(null);
        res.status(200).json(products);
    }

    async getProduct(req: Request<{ id: string }>, res: Response){
        const product = await this.productosUseCases.getProduct(Number(req.params.id));
        res.status(200).json(product);
    }
}

export default ProductosController;
