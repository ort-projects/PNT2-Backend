import type { PedidosDao } from '../../types/daos.js'
import type { Pedido } from '../../types/entities.js'
import toPedido from './toPedido.js'

export default async function getAll(dao: PedidosDao): Promise<Pedido[]> {
    const pedidos = await dao.getAllOrders()
    return pedidos.map(toPedido)
}
