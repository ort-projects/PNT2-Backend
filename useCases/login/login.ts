import AppError from "../../errors/AppError.js";
import type { LoginInput } from "../../schemas/loginSchema.js";
import type { UsuariosDao } from "../../types/daos.js";
import type { TokenService } from "../../types/services.js";

export interface LoginDependencies {
    userRepository: UsuariosDao;
    tokenService: TokenService;
}

export default async function login(data: LoginInput, { userRepository, tokenService }: LoginDependencies) {
    const user = await userRepository.getUserByUsername(data.username);
    if(!user || user.password !== data.password)
        throw new AppError("USER_NOT_FOUND", "No se encontro el usuario", 400)

    return tokenService.createToken(user);
}
