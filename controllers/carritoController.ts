import type { Request, Response } from 'express'
import type { CartImportInput, CartSaveInput } from '../schemas/cartSchema.js'
import type { CarritoUseCases } from '../useCases/carrito/makeCarritoUseCases.js'

class CarritoController {
    constructor(private readonly carritoUseCases: CarritoUseCases) {}

    async get(req: Request, res: Response) {
        const cart = await this.carritoUseCases.get(req.auth!.sub)
        res.status(200).json(cart)
    }

    async save(req: Request<{}, unknown, CartSaveInput>, res: Response) {
        const cart = await this.carritoUseCases.save(req.auth!.sub, req.body)
        res.status(200).json(cart)
    }

    async import(req: Request<{}, unknown, CartImportInput>, res: Response) {
        const cart = await this.carritoUseCases.import(req.auth!.sub, req.body)
        res.status(200).json(cart)
    }
}

export default CarritoController
