import express from 'express'
import type { RequestHandler } from 'express'
import type PedidosController from '../controllers/pedidosController.js'
import { validateBody, validateParams, validateQuery } from '../middlewares/validate.js'
import { orderSchema } from '../schemas/orderSchema.js'
import { pedidoIdParamsSchema, pedidoPatchSchema } from '../schemas/pedidoPatchSchema.js'
import { pedidosQuerySchema } from '../schemas/pedidosQuerySchema.js'
import { emptyBodySchema, emptyObjectSchema } from '../schemas/cartSchema.js'

export default function createPedidosRoutes(controller: PedidosController, userAuth: RequestHandler, adminAuth: RequestHandler) {
    const router = express.Router()
    router.post('/', userAuth, validateParams(emptyObjectSchema), validateQuery(emptyObjectSchema, 'validatedQuery'), validateBody(orderSchema), (req, res) => controller.createOrder(req, res))
    router.get('/', userAuth, validateParams(emptyObjectSchema), validateQuery(emptyObjectSchema, 'validatedQuery'), validateBody(emptyBodySchema), (req, res) => controller.getMyOrders(req, res))
    router.get('/all', adminAuth, validateParams(emptyObjectSchema), validateQuery(pedidosQuerySchema, 'validatedQuery'), validateBody(emptyBodySchema), (req, res) => controller.getAllOrders(req, res))
    router.patch('/:id', adminAuth, validateParams(pedidoIdParamsSchema), validateQuery(emptyObjectSchema, 'validatedQuery'), validateBody(pedidoPatchSchema), (req, res) => controller.updateOrderStatus(req, res))
    return router
}
