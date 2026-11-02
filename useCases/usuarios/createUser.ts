import AppError from '../../errors/AppError.js'
import type { UsuarioInput } from '../../schemas/usuarioSchema.js'
import type { UsuariosDao } from '../../types/daos.js'
import type { PasswordHasher } from '../../types/services.js'

async function createUser(data: UsuarioInput, dao: UsuariosDao, passwordHasher: PasswordHasher) {
    if (await dao.getUserByUsername(data.username)) {
        throw new AppError('USERNAME_EN_USO', 'Ya existe una cuenta registrada con ese email.', 409)
    }

    try {
        return await dao.createUser({ ...data, password: await passwordHasher.hash(data.password) })
    } catch (error) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            error.code === 'P2002'
        ) {
            throw new AppError('USERNAME_EN_USO', 'Ya existe una cuenta registrada con ese email.', 409)
        }

        throw error
    }
}

export default createUser
