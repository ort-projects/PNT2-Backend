import * as z from "zod";

const usuarioSchema = z.object({
    username: z.email("USERNAME_INVALID").nonempty("USERNAME_INVALID").nonoptional("USERNAME_INVALID"),
    name: z.string("NAME_INVALID").trim().min(1, "NAME_INVALID").nonoptional("NAME_INVALID"),
    surname: z.string("SURNAME_INVALID").trim().min(1, "SURNAME_INVALID").nonoptional("SURNAME_INVALID"),
    password: z.string("PASSWORD_INVALID").min(8, "PASSWORD_INVALID").nonempty("PASSWORD_INVALID").nonoptional("PASSWORD_INVALID"),
});

export { usuarioSchema };
export type UsuarioInput = z.infer<typeof usuarioSchema>;
