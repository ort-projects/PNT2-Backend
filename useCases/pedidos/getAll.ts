import type { PedidosDao } from '../../types/daos.js'
import type { Pedido } from '../../types/entities.js'
import toPedido from './toPedido.js'

export default async function getAll(dao: PedidosDao, username?: string): Promise<Pedido[]> {
    const pedidos = username === undefined
        ? await dao.getAllOrders()
        : await dao.getOrdersByUsername(username)
    return pedidos.map(toPedido)
}
