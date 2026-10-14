import AppError from "../../errors/AppError.js";

export default async function login(data, { userRepository, tokenService }) {
    const user = await userRepository.getUser(data.username);
    if(!user || user.password !== data.password)
        throw new AppError("USER_NOT_FOUND", "No se encontro el usuario", 400)

    return tokenService.createToken(user);
}
