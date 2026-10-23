import type { UsuariosDao } from "../../types/daos.js";

async function getUsers(filter: unknown, dao: UsuariosDao) {
    return dao.getUsers();
}

export default getUsers;