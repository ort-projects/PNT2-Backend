import type { PedidosDao } from '../../types/daos.js'
import type { Pedido } from '../../types/entities.js'
import toPedido from './toPedido.js'

export default async function getOrdersByUsername(username: string, dao: PedidosDao): Promise<Pedido[]> {
    const pedidos = await dao.getOrdersByUsername(username)
    return pedidos.map(toPedido)
}
