import express from "express"
import { validateBody } from "../middlewares/validate.js";
import { loginSchema } from "../schemas/loginSchema.js"
import type LoginController from "../controllers/loginController.js";

function createLoginRoutes(loginController: LoginController){
    const router = express.Router();

    router.post("/", validateBody(loginSchema), (req, res) => loginController.login(req, res));
    
    return router;
}

export default createLoginRoutes;
