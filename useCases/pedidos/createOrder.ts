import type { PedidosDao } from '../../types/daos.ts'
import type { OrderInput } from '../../schemas/orderSchema.js'

export default async function createOrder(username: string, data: OrderInput, pedidosDao: PedidosDao) {
    return pedidosDao.createOrder(username, data.items)
}
