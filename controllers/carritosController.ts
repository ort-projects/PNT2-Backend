import type { Request, Response } from "express";
import type { CarritosUseCases } from "../useCases/carritos/makeCarritosUseCases.js";

export default class CarritosController{
    carritosUseCases: CarritosUseCases;

    constructor(carritosUseCases: CarritosUseCases){
        this.carritosUseCases = carritosUseCases;
    }

    async getCart(req: Request<{ id: string }>, res: Response) {
        const carrito = await this.carritosUseCases.getCart(Number(req.params.id));
        res.status(200).json(carrito);

    }

    async createCart(req: Request, res: Response) {
        
    }

}
