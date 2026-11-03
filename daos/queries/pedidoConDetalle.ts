import type { Prisma } from '../../generated/prisma/client.js'

export const pedidoConDetalleSelect = {
    id: true,
    date: true,
    status: true,
    user: {
        select: {
            username: true,
            name: true,
            surname: true,
        },
    },
    items: {
        select: {
            productId: true,
            price: true,
            quantity: true,
            product: {
                select: {
                    title: true,
                    thumbnail: true,
                },
            },
        },
    },
} satisfies Prisma.PedidoSelect

export type PedidoConDetalle = Prisma.PedidoGetPayload<{ select: typeof pedidoConDetalleSelect }>
