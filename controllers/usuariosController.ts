import type { Request, Response } from "express";
import type { UsuariosUseCases } from "../useCases/usuarios/makeUsuariosUseCases.js";
import type { UsuarioInput } from "../schemas/usuarioSchema.js";

class UsuariosController{
    usuariosUseCases: UsuariosUseCases;

    constructor(usuariosUseCases: UsuariosUseCases){
        this.usuariosUseCases = usuariosUseCases;
    }

    async getUsers(req: Request, res: Response){
        const usuarios = await this.usuariosUseCases.getUsers(null);
        res.status(200).json(usuarios);
    }

    async getUser(req: Request, res: Response){
        const usuario = await this.usuariosUseCases.getUser(Number(req.params.id));
        res.status(200).json(usuario);
    }

    async createUser(req: Request<{}, unknown, UsuarioInput>, res: Response){
        const usuario = await this.usuariosUseCases.createUser(req.body);
        res.status(201).json(usuario);
    }
}

export default UsuariosController;
