import type { PrismaClient } from '../generated/prisma/client.ts'
import type { PedidosDao as IPedidosDao } from '../types/daos.ts'
import AppError from '../errors/AppError.js'

class PedidosDao implements IPedidosDao {
    constructor(private prisma: PrismaClient) {}

    async createOrder(username: string, items: { productId: number; quantity: number }[]) {
        return this.prisma.$transaction(async (tx) => {
            const usuario = await tx.usuario.findUnique({ where: { username }, select: { id: true } })
            if (!usuario) throw new AppError('USUARIO_NO_ENCONTRADO', 'No se encontró el usuario autenticado.', 404)

            const ids = [...new Set(items.map((item) => item.productId))]
            const productos = await tx.producto.findMany({ where: { id: { in: ids } } })
            const porId = new Map(productos.map((producto) => [producto.id, producto]))

            for (const item of items) {
                if (!porId.has(item.productId)) {
                    throw new AppError('PRODUCTO_NO_ENCONTRADO', `No existe el producto ${item.productId}.`, 404)
                }
            }

            return tx.pedido.create({
                data: {
                    userId: usuario.id,
                    items: { create: items.map(({ productId, quantity }) => ({
                        productId,
                        quantity,
                        price: porId.get(productId)!.price,
                    })) },
                },
                include: { items: true, user: { select: { username: true } } },
            })
        })
    }

    async getOrdersByUsername(username: string) {
        return this.prisma.pedido.findMany({
            where: { user: { username } },
            include: { items: true },
            orderBy: { date: 'desc' },
        })
    }

    async getAllOrders() {
        return this.prisma.pedido.findMany({
            include: { items: true, user: { select: { username: true } } },
            orderBy: { date: 'desc' },
        })
    }
}

export default PedidosDao
