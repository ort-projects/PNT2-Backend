import AppError from '../../errors/AppError.js'
import type { EstadoPedido, Pedido } from '../../types/entities.js'
import type { PedidosDao } from '../../types/daos.js'
import toPedido from './toPedido.js'

export default async function updateOrderStatus(id: number, status: EstadoPedido, dao: PedidosDao): Promise<Pedido> {
    const pedido = await dao.updateStatus(id, status)
    if (!pedido) {
        throw new AppError('PEDIDO_NO_ENCONTRADO', 'No se encontró el pedido.', 404)
    }

    return toPedido(pedido)
}
