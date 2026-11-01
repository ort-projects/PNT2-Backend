import AppError from "../../errors/AppError.js";
import type { NuevoUsuario, UsuarioPublico } from "../../types/entities.js";
import type { UsuariosDao } from "../../types/daos.js";

function isUniqueConstraintError(error: unknown): boolean {
    return error !== null &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "P2002";
}

export default async function createUser(data: NuevoUsuario, dao: UsuariosDao): Promise<UsuarioPublico> {
    const existingUser = await dao.getUserByUsername(data.username);

    if (existingUser) {
        throw new AppError("USERNAME_EN_USO", "Ya existe una cuenta con ese email.", 409);
    }

    try {
        return await dao.createUser(data);
    } catch (error) {
        // La restriccion unica de Prisma tambien cubre altas simultaneas del mismo email.
        if (isUniqueConstraintError(error)) {
            throw new AppError("USERNAME_EN_USO", "Ya existe una cuenta con ese email.", 409);
        }

        throw error;
    }
}
