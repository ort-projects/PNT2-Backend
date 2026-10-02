import login from "../useCases/login/login.js";

class LoginController{
    constructor(){

    }

    async login(req, res) {
        await login(req.body)
        return res.sendStatus(204);
    }
}

export default LoginController;