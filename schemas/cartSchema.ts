import * as z from 'zod'

const cartItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
}).strict()

const uniqueCartItemsSchema = z.array(cartItemSchema).superRefine((items, context) => {
    const productIds = new Set<number>()

    items.forEach((item, index) => {
        if (productIds.has(item.productId)) {
            context.addIssue({
                code: 'custom',
                path: [index, 'productId'],
                message: 'PRODUCTO_DUPLICADO',
            })
        }
        productIds.add(item.productId)
    })
})

const cartItemsSchema = uniqueCartItemsSchema

const cartSaveSchema = z.object({
    version: z.number().int().positive(),
    items: cartItemsSchema,
}).strict()

const cartImportSchema = z.object({
    importId: z.string().trim().min(1).max(100),
    items: cartItemsSchema,
}).strict()

const emptyObjectSchema = z.object({}).strict()
const emptyBodySchema = z.preprocess(
    (value) => value === undefined ? {} : value,
    emptyObjectSchema,
)

export { cartSaveSchema, cartImportSchema, emptyObjectSchema, emptyBodySchema }
export type CartSaveInput = z.infer<typeof cartSaveSchema>
export type CartImportInput = z.infer<typeof cartImportSchema>
