import type { PrismaClient } from '../generated/prisma/client.ts'
import type { PedidosDao as IPedidosDao } from '../types/daos.ts'
import type { Pedido } from '../types/entities.ts'
import AppError from '../errors/AppError.js'

// Lo que se trae de la base junto con cada pedido (nunca la contraseña del usuario)
const incluirDetalle = {
    user: {
        select: {
            username: true,
            name: true,
            surname: true
        }
    },
    items: {
        include: {
            product: {
                select: {
                    title: true,
                    thumbnail: true
                }
            }
        }
    },
} as const

type PedidoDeLaBase = {
    id: number
    date: Date
    user: Pedido['user']
    items: {
        productId: number;
        price: number;
        quantity: number;
        product: {
            title: string;
            thumbnail: string
        }
    }[]
}

// Arma el pedido como lo recibe el front: ítems con título e imagen, y el total
function toPedido(pedido: PedidoDeLaBase): Pedido {
    let total = 0
    for (const item of pedido.items) {
        total += item.price * item.quantity
    }

    return {
        id: pedido.id,
        date: pedido.date,
        total: Math.round(total * 100) / 100,
        user: pedido.user,
        items: pedido.items.map((item) => ({
            productId: item.productId,
            title: item.product.title,
            thumbnail: item.product.thumbnail,
            price: item.price,
            quantity: item.quantity,
        })),
    }
}

class PedidosDao implements IPedidosDao {
    constructor(private prisma: PrismaClient) { }

    async createOrder(username: string, items: { productId: number; quantity: number }[]) {
        const pedido = await this.prisma.$transaction(async (tx) => {
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
                    items: {
                        create: items.map(({ productId, quantity }) => ({
                            productId,
                            quantity,
                            price: porId.get(productId)!.price,
                        }))
                    },
                },
                include: incluirDetalle,
            })
        })
        return toPedido(pedido)
    }

    async getOrdersByUsername(username: string) {
        const pedidos = await this.prisma.pedido.findMany({
            where: { user: { username } },
            include: incluirDetalle,
            orderBy: { date: 'desc' },
        })
        return pedidos.map(toPedido)
    }

    async getAllOrders() {
        const pedidos = await this.prisma.pedido.findMany({
            include: incluirDetalle,
            orderBy: { date: 'desc' },
        })
        return pedidos.map(toPedido)
    }
}

export default PedidosDao
