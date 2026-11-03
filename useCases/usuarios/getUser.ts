import AppError from "../../errors/AppError.js";
import type { UsuariosDao } from "../../types/daos.js";

async function getUser(id: number, dao: UsuariosDao) {
    if(!Number.isInteger(id) || id <= 0)
        throw new AppError("ID_INVALIDO", "El id debe ser un número entero positivo", 400)

    const user = await dao.getUser(id);
    if(!user)
        throw new AppError("USER_NOT_FOUND", "No se encontro el usuario", 404)
        
    return user ;
}

export default getUser;
