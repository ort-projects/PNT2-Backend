import * as z from 'zod'

const loginSchema = z.object({
    username: z.email("USERNAME_INVALID").nonempty("USERNAME_INVALID").nonoptional("USERNAME_INVALID"),
    password: z.string("PASSWORD_INVALID").min(8).nonempty().nonoptional()
})

export { loginSchema }
export type LoginInput = z.infer<typeof loginSchema>;
