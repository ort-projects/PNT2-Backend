import getUser from "./getUser.js";
import getUsers from "./getUsers.js";
import createUser from "./createUser.js";
import type { UsuariosDao } from "../../types/daos.js";
import type { PasswordHasher } from "../../types/services.js";
import { UsuarioInput } from "../../schemas/usuarioSchema.js";

export default function makeUsuariosUseCases(dao: UsuariosDao, passwordHasher: PasswordHasher){
    return{
        getUser: (id: number) => getUser(id, dao),
        getUsers: (filter: unknown) => getUsers(filter, dao),
        createUser: (data: UsuarioInput) => createUser(data, dao, passwordHasher)
    };
}

export type UsuariosUseCases = ReturnType<typeof makeUsuariosUseCases>;
