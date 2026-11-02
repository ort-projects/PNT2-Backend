import * as z from 'zod'

const orderItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
})

const orderSchema = z.object({
    items: z.array(orderItemSchema).min(1),
})

export { orderSchema }
export type OrderInput = z.infer<typeof orderSchema>
