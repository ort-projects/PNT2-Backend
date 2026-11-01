import type { Request, Response } from "express";
import type { UsuarioInput } from "../schemas/usuarioSchema.js";
import type { UsuariosUseCases } from "../useCases/usuarios/makeUsuariosUseCases.js";

class UsuariosController {
    usuariosUseCases: UsuariosUseCases;

    constructor(usuariosUseCases: UsuariosUseCases) {
        this.usuariosUseCases = usuariosUseCases;
    }

    async createUser(req: Request<{}, unknown, UsuarioInput>, res: Response) {
        const usuario = await this.usuariosUseCases.createUser(req.body);
        return res.status(201).json(usuario);
    }

    async getUsers(req: Request, res: Response) {
        const usuarios = await this.usuariosUseCases.getUsers(null);
        return res.status(200).json(usuarios);
    }

    async getUser(req: Request<{ id: string }>, res: Response) {
        const usuario = await this.usuariosUseCases.getUser(Number(req.params.id));
        return res.status(200).json(usuario);
    }
}

export default UsuariosController;
