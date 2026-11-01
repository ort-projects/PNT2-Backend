import express from "express";
import UsuariosController from "../controllers/usuariosController.js";
import { validateBody } from "../middlewares/validate.js";
import { usuarioSchema } from "../schemas/usuarioSchema.js";

function createUsuariosRoutes(usuariosController: UsuariosController) {
    const router = express.Router();

    router.post("/", validateBody(usuarioSchema), (req, res) => usuariosController.createUser(req, res));
    router.get("/", (req, res) => usuariosController.getUsers(req, res));
    router.get("/:id", (req, res) => usuariosController.getUser(req, res));

    return router;
}

export default createUsuariosRoutes;
