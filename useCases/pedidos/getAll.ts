import type { PedidosDao, PedidosFiltro } from '../../types/daos.js'
import type { Pedido } from '../../types/entities.js'
import toPedido from './toPedido.js'

export default async function getAll(dao: PedidosDao, filters?: PedidosFiltro): Promise<Pedido[]> {
    const pedidos = await dao.getAllOrders(filters)
    return pedidos.map(toPedido)
}
