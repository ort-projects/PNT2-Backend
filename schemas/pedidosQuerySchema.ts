import * as z from 'zod'

const pedidosQuerySchema = z.object({
    username: z.string().trim().min(1, 'USERNAME_INVALID').optional(),
})

export { pedidosQuerySchema }
export type PedidosQueryInput = z.infer<typeof pedidosQuerySchema>
