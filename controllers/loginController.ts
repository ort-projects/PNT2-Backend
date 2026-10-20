import type { Request, Response } from "express";
import type { LoginInput } from "../schemas/loginSchema.js";
import type { LoginUseCases } from "../useCases/login/makeLoginUseCases.js";

export default class LoginController{
    loginUseCases: LoginUseCases;

    constructor(loginUseCases: LoginUseCases){
        this.loginUseCases = loginUseCases;
    }

    async login(req: Request<{}, unknown, LoginInput>, res: Response) {
        const token = await this.loginUseCases.login(req.body);
        return res.status(200).json({ token: token })
    }
}
