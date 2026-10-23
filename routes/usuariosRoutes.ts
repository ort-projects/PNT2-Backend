import express from "express"
import UsuariosController from "../controllers/usuariosController.js";

function createUsuariosRoutes(usuariosController: UsuariosController){
    const router = express.Router();

    router.get("/", (req, res) => usuariosController.getUsers(req, res));
    router.get("/:id", (req, res) => usuariosController.getUser(req, res));
    
    return router;
}

export default createUsuariosRoutes;