import express from 'express'
import type { RequestHandler } from 'express'
import type PedidosController from '../controllers/pedidosController.js'
import { validateBody, validateQuery } from '../middlewares/validate.js'
import { orderSchema } from '../schemas/orderSchema.js'
import { pedidosQuerySchema } from '../schemas/pedidosQuerySchema.js'

export default function createPedidosRoutes(controller: PedidosController, userAuth: RequestHandler, adminAuth: RequestHandler) {
    const router = express.Router()
    router.post('/', userAuth, validateBody(orderSchema), (req, res) => controller.createOrder(req, res))
    router.get('/', userAuth, (req, res) => controller.getMyOrders(req, res))
    router.get('/all', adminAuth, validateQuery(pedidosQuerySchema, 'validatedQuery'), (req, res) => controller.getAllOrders(req, res))
    return router
}
