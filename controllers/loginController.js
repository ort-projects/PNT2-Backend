export default class LoginController{
    constructor(loginUseCases){
        this.loginUseCases = loginUseCases;
    }

    async login(req, res) {
        const token = await this.loginUseCases.login(req.body);
        return res.status(200).json({ token: token })
    }
}
