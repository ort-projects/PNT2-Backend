import express from 'express'
import type { RequestHandler } from 'express'
import type PedidosController from '../controllers/pedidosController.js'

export default function createPedidosRoutes(controller: PedidosController, userAuth: RequestHandler, adminAuth: RequestHandler) {
    const router = express.Router()
    router.post('/', userAuth, (req, res) => controller.createOrder(req, res))
    router.get('/', userAuth, (req, res) => controller.getMyOrders(req, res))
    router.get('/all', adminAuth, (req, res) => controller.getAllOrders(req, res))
    return router
}
