import type { Request, Response } from 'express'
import type { PedidosUseCases } from '../useCases/pedidos/makePedidosUseCases.ts'

class PedidosController {
    constructor(private pedidosUseCases: PedidosUseCases) {}

    async createOrder(req: Request, res: Response) {
        const order = await this.pedidosUseCases.createOrder(req.auth!.sub, req.body)
        res.status(201).json(order)
    }

    async getMyOrders(req: Request, res: Response) {
        const orders = await this.pedidosUseCases.getOrdersByUsername(req.auth!.sub)
        res.status(200).json(orders)
    }

    async getAllOrders(req: Request, res: Response) {
        const orders = await this.pedidosUseCases.getAllOrders()
        res.status(200).json(orders)
    }
}

export default PedidosController
