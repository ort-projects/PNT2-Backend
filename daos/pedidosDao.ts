import type { Pedido, PrismaClient } from '../generated/prisma/client.js'
import type { EstadoPedido } from '../types/entities.js'
import type { NuevoPedido, PedidosDao as IPedidosDao, PedidosFiltro } from '../types/daos.js'
import { pedidoConDetalleSelect, type PedidoConDetalle } from './queries/pedidoConDetalle.js'

class PedidosDao implements IPedidosDao {
    constructor(private readonly prisma: PrismaClient) {}

    async save({ userId, items }: NuevoPedido): Promise<Pedido> {
        return this.prisma.pedido.create({
            data: {
                userId,
                items: { create: items },
            },
        })
    }

    async createFromCart(userId: number, version: number): Promise<PedidoConDetalle | undefined> {
        return this.prisma.$transaction(async (transaction) => {
            const cart = await transaction.carrito.findUnique({
                where: { userId },
                include: { items: { include: { product: true } } },
            })
            if (!cart || cart.version !== version || cart.items.length === 0) return undefined

            const claimedCart = await transaction.carrito.updateMany({
                where: { id: cart.id, version },
                data: { version: { increment: 1 } },
            })
            if (claimedCart.count === 0) return undefined

            const order = await transaction.pedido.create({
                data: {
                    userId,
                    items: {
                        create: cart.items.map(({ productId, quantity, product }) => ({
                            productId,
                            quantity,
                            price: product.price,
                        })),
                    },
                },
                select: pedidoConDetalleSelect,
            })

            await transaction.carritoItem.deleteMany({ where: { cartId: cart.id } })

            return order
        })
    }

    async getOrdersByUsername(username: string): Promise<PedidoConDetalle[]> {
        return this.prisma.pedido.findMany({
            where: { user: { username } },
            select: pedidoConDetalleSelect,
            orderBy: { date: 'desc' },
        })
    }

    async getAllOrders(filters?: PedidosFiltro): Promise<PedidoConDetalle[]> {
        const where = {
            ...(filters?.username ? { user: { username: filters.username } } : {}),
            ...(filters?.status ? { status: filters.status } : {}),
        }

        return this.prisma.pedido.findMany({
            where,
            select: pedidoConDetalleSelect,
            orderBy: { date: 'desc' },
        })
    }

    async updateStatus(id: number, status: EstadoPedido): Promise<PedidoConDetalle | undefined> {
        const pedido = await this.prisma.pedido.findUnique({
            where: { id },
            select: { id: true },
        })
        if (!pedido) return undefined

        return this.prisma.pedido.update({
            where: { id },
            data: { status },
            select: pedidoConDetalleSelect,
        })
    }
}

export default PedidosDao
