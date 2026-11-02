import type { PedidosDao } from '../../types/daos.js'
import type { Pedido } from '../../types/entities.js'

type PedidoConDetalle = Awaited<ReturnType<PedidosDao['getAllOrders']>>[number]

export default function toPedido(pedido: PedidoConDetalle): Pedido {
    const total = pedido.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return {
        id: pedido.id,
        date: pedido.date,
        total: Math.round(total * 100) / 100,
        user: {
            username: pedido.user.username,
            name: pedido.user.name,
            surname: pedido.user.surname,
        },
        items: pedido.items.map((item) => ({
            productId: item.productId,
            title: item.product.title,
            thumbnail: item.product.thumbnail,
            price: item.price,
            quantity: item.quantity,
        })),
    }
}
