import * as z from 'zod'

const orderItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
}).strict()

const orderItemsSchema = z.array(orderItemSchema).min(1)

const orderSchema = z.union([
    z.object({ items: orderItemsSchema }).strict().superRefine((order, context) => {
        const productIds = new Set<number>()
        order.items.forEach((item, index) => {
            if (productIds.has(item.productId)) {
                context.addIssue({
                    code: 'custom',
                    path: ['items', index, 'productId'],
                    message: 'PRODUCTO_DUPLICADO',
                })
            }
            productIds.add(item.productId)
        })
    }),
    z.object({ carritoVersion: z.number().int().positive() }).strict(),
])

export { orderSchema }
export type OrderInput = z.infer<typeof orderSchema>
