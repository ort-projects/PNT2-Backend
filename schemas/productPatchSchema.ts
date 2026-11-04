import { z } from 'zod'

const productPatchSchema = z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    category: z.string().trim().min(1).optional(),
    price: z.number().positive().optional(),
    thumbnail: z.string().trim().min(1).optional(),
    destacado: z.boolean().optional(),
}).strict().refine((changes) => Object.keys(changes).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar.',
})

export default productPatchSchema
