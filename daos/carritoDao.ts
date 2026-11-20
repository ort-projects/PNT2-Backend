import type { PrismaClient } from '../generated/prisma/client.js'
import type { CarritoDao as ICarritoDao, CartData, CartItemData } from '../types/daos.js'

class CarritoDao implements ICarritoDao {
    constructor(private readonly prisma: PrismaClient) {}

    async get(userId: number): Promise<CartData> {
        await this.prisma.carrito.upsert({
            where: { userId },
            update: {},
            create: { userId },
        })
        return this.findCart(userId)
    }

    async save(userId: number, version: number, items: CartItemData[]): Promise<CartData | undefined> {
        return this.prisma.$transaction(async (transaction) => {
            const cart = await transaction.carrito.upsert({
                where: { userId },
                update: {},
                create: { userId },
            })
            const updated = await transaction.carrito.updateMany({
                where: { id: cart.id, version },
                data: { version: { increment: 1 } },
            })

            if (updated.count === 0) return undefined

            await transaction.carritoItem.deleteMany({ where: { cartId: cart.id } })
            for (const item of items) {
                await transaction.carritoItem.create({
                    data: { cartId: cart.id, ...item },
                })
            }

            const saved = await transaction.carrito.findUniqueOrThrow({
                where: { id: cart.id },
                select: { version: true, items: { select: { productId: true, quantity: true } } },
            })
            return saved
        })
    }

    async import(userId: number, importId: string, items: CartItemData[]): Promise<CartData> {
        return this.prisma.$transaction(async (transaction) => {
            const cart = await transaction.carrito.upsert({
                where: { userId },
                update: {},
                create: { userId },
            })
            const previousImport = await transaction.carritoImport.findUnique({
                where: { cartId_importId: { cartId: cart.id, importId } },
            })

            if (!previousImport) {
                for (const item of items) {
                    await transaction.carritoItem.upsert({
                        where: { cartId_productId: { cartId: cart.id, productId: item.productId } },
                        update: { quantity: { increment: item.quantity } },
                        create: { cartId: cart.id, ...item },
                    })
                }
                await transaction.carritoImport.create({ data: { cartId: cart.id, importId } })
                await transaction.carrito.update({
                    where: { id: cart.id },
                    data: { version: { increment: 1 } },
                })
            }

            return transaction.carrito.findUniqueOrThrow({
                where: { id: cart.id },
                select: { version: true, items: { select: { productId: true, quantity: true } } },
            })
        })
    }

    private async findCart(userId: number): Promise<CartData> {
        return this.prisma.carrito.findUniqueOrThrow({
            where: { userId },
            select: { version: true, items: { select: { productId: true, quantity: true } } },
        })
    }
}

export default CarritoDao
