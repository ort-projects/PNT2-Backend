import type { PedidosDao } from '../../types/daos.ts'
import AppError from '../../errors/AppError.js'

export default async function createOrder(username: string, items: { productId: number; quantity: number }[], pedidosDao: PedidosDao){
     if (!Array.isArray(items) || items.length === 0) {
            throw new AppError('ITEMS_INVALIDOS', 'El pedido debe contener al menos un producto.', 400)
        }
        for (const item of items) {
            if (!item || !Number.isInteger(item.productId) || item.productId <= 0 ||
                !Number.isInteger(item.quantity) || item.quantity <= 0) {
                throw new AppError('ITEM_INVALIDO', 'Cada item debe incluir productId y quantity como enteros positivos.', 400)
            }
        }
        return pedidosDao.createOrder(username, items)
    }