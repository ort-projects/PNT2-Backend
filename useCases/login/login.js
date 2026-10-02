import AppError from "../../errors/AppError.js";

const usuariosValidos = [
    {username: "gonzalo@cabo.com", password:"12345678"},
    {username: "dana@mehle.com", password:"12345678"},
    {username: "gabriel@teruel.com", password:"12345678"}
];

async function login(data) {
    if(!usuariosValidos.some(x => x.username == data.username && x.password == data.password))
        throw new AppError("USER_NOT_FOUND", "No se encontro el usuario", 400)
        
    return true;
}

export default login;