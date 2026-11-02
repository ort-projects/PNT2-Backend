import AppError from "../../errors/AppError.js";
import type { LoginInput } from "../../schemas/loginSchema.js";
import type { UsuariosDao } from "../../types/daos.js";
import type { PasswordHasher, TokenService } from "../../types/services.js";

export interface LoginDependencies {
    userRepository: UsuariosDao;
    tokenService: TokenService;
    passwordHasher: PasswordHasher;
}

export default async function login(data: LoginInput, { userRepository, tokenService, passwordHasher }: LoginDependencies) {
    const user = await userRepository.getUserCredentialsByUsername(data.username);
    if(!user)
        throw new AppError("USER_NOT_FOUND", "No se encontro el usuario", 400)

    if (!(await passwordHasher.compare(data.password, user.password)))
        throw new AppError("USER_NOT_FOUND", "No se encontro el usuario", 400)

    return tokenService.createToken(user);
}
