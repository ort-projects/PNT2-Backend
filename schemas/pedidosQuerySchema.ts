import * as z from 'zod'
import { estadoPedidoSchema } from './pedidoPatchSchema.js'

const pedidosQuerySchema = z.object({
    username: z.string().trim().min(1, 'USERNAME_INVALID').optional(),
    status: estadoPedidoSchema.optional(),
}).strict()

export { pedidosQuerySchema }
export type PedidosQueryInput = z.infer<typeof pedidosQuerySchema>
