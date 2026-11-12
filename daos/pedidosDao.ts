import type { Pedido, PrismaClient } from '../generated/prisma/client.js'
import type { EstadoPedido } from '../types/entities.js'
import type { NuevoPedido, PedidosDao as IPedidosDao } from '../types/daos.js'
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

    async getOrdersByUsername(username: string): Promise<PedidoConDetalle[]> {
        return this.prisma.pedido.findMany({
            where: { user: { username } },
            select: pedidoConDetalleSelect,
            orderBy: { date: 'desc' },
        })
    }

    async getAllOrders(): Promise<PedidoConDetalle[]> {
        return this.prisma.pedido.findMany({
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
