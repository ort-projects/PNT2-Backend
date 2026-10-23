import LoginController from "../controllers/loginController.js";
import ProductosController from "../controllers/productosController.js";
import AdminController from "../controllers/adminController.js";
import ProductosDao from "../daos/productosDao.js";
import UsuariosDao from "../daos/usuariosDao.js";
import makeAdminAuth from "../middlewares/adminAuth.js";
import makeAdminUseCases from "../useCases/admin/makeAdminUseCases.js";
import makeLoginUseCases from "../useCases/login/makeLoginUseCases.js";
import makeProductosUseCases from "../useCases/productos/makeProductosUseCases.js";
import { createToken, verifyToken } from "../adapters/security/jwtTokenService.js";
import createRouter from "../routes/index.js";
import prisma from "../connection/prisma.js";
import type { TokenService } from "../types/services.js";

function buildContainer() {
    const tokenService: TokenService = {
        createToken,
        verifyToken,
    };

    const productosDao = new ProductosDao(prisma);

    const loginUseCases = makeLoginUseCases({ userRepository: UsuariosDao, tokenService });
    const productosUseCases = makeProductosUseCases(productosDao);
    const adminUseCases = makeAdminUseCases();

    const loginController = new LoginController(loginUseCases);
    const productosController = new ProductosController(productosUseCases);
    const adminController = new AdminController(adminUseCases);
    const adminAuth = makeAdminAuth(tokenService);

    const router = createRouter({
        productosController,
        loginController,
        adminController,
        adminAuth,
    });

    return { router };
}

export default buildContainer;
