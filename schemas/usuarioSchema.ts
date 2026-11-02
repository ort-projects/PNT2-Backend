import * as z from 'zod'

const usuarioSchema = z.object({
    username: z.email('USERNAME_INVALID').trim(),
    name: z.string('NAME_INVALID').trim().min(1, 'NAME_INVALID'),
    surname: z.string('SURNAME_INVALID').trim().min(1, 'SURNAME_INVALID'),
    password: z.string('PASSWORD_INVALID').min(8, 'PASSWORD_INVALID'),
})

export { usuarioSchema }
export type UsuarioInput = z.infer<typeof usuarioSchema>
