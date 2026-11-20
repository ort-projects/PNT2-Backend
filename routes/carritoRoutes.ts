import express from 'express'
import type { RequestHandler } from 'express'
import type CarritoController from '../controllers/carritoController.js'
import { validateBody, validateParams, validateQuery } from '../middlewares/validate.js'
import { cartImportSchema, cartSaveSchema, emptyBodySchema, emptyObjectSchema } from '../schemas/cartSchema.js'

export default function createCarritoRoutes(controller: CarritoController, userAuth: RequestHandler) {
    const router = express.Router()

    router.get('/', userAuth, validateParams(emptyObjectSchema), validateQuery(emptyObjectSchema, 'validatedQuery'), validateBody(emptyBodySchema), (req, res) => controller.get(req, res))
    router.put('/', userAuth, validateParams(emptyObjectSchema), validateQuery(emptyObjectSchema, 'validatedQuery'), validateBody(cartSaveSchema), (req, res) => controller.save(req, res))
    router.post('/importar', userAuth, validateParams(emptyObjectSchema), validateQuery(emptyObjectSchema, 'validatedQuery'), validateBody(cartImportSchema), (req, res) => controller.import(req, res))

    return router
}
