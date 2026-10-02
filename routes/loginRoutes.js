import express from "express"
import { validateBody } from "../middlewares/validate.js";
import { loginSchema } from "../schemas/loginSchema.js"

function createLoginRoutes(loginController){
    const router = express.Router();

    router.post("/", validateBody(loginSchema), (req, res) => loginController.login(req, res));
    
    return router;
}

export default createLoginRoutes;