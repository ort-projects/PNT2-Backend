import getUser from "./getUser.js";
import getUsers from "./getUsers.js";
import type { UsuariosDao } from "../../types/daos.js";

export default function makeUsuariosUseCases(dao: UsuariosDao){
    return{
        getUser: (id: number) => getUser(id, dao),
        getUsers: (filter: unknown) => getUsers(filter, dao)
    };
}

export type UsuariosUseCases = ReturnType<typeof makeUsuariosUseCases>;
