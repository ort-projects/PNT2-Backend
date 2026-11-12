import { z } from 'zod'

const estadoPedidoSchema = z.enum(['pendiente', 'enviado', 'entregado', 'cancelado'])

const pedidoIdParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
}).strict()

const pedidoPatchSchema = z.object({
    status: estadoPedidoSchema,
}).strict()

export { estadoPedidoSchema, pedidoIdParamsSchema, pedidoPatchSchema }
export type EstadoPedido = z.infer<typeof estadoPedidoSchema>
export type PedidoIdParamsInput = z.infer<typeof pedidoIdParamsSchema>
export type PedidoPatchInput = z.infer<typeof pedidoPatchSchema>
