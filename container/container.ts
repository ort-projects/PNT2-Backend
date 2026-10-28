import LoginController from "../controllers/loginController.js";
import ProductosController from "../controllers/productosController.js";
import UsuariosController from "../controllers/usuariosController.js";
import AdminController from "../controllers/adminController.js";
import ProductosDao from "../daos/productosDao.js";
import UsuariosDao from "../daos/usuariosDao.js";
import PedidosDao from "../daos/pedidosDao.js";
import makeAdminAuth from "../middlewares/adminAuth.js";
import makeAdminUseCases from "../useCases/admin/makeAdminUseCases.js";
import makeLoginUseCases from "../useCases/login/makeLoginUseCases.js";
import makeProductosUseCases from "../useCases/productos/makeProductosUseCases.js";
import makeUsuariosUseCases from "../useCases/usuarios/makeUsuariosUseCases.js";
import makePedidosUseCases from "../useCases/pedidos/makePedidosUseCases.js";
import PedidosController from "../controllers/pedidosController.js";
import makeUserAuth from "../middlewares/userAuth.js";
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
    const usuariosDao = new UsuariosDao(prisma);
    const pedidosDao = new PedidosDao(prisma);

    const loginUseCases = makeLoginUseCases({ userRepository: usuariosDao, tokenService });
    const productosUseCases = makeProductosUseCases(productosDao);
    const usuariosUseCases = makeUsuariosUseCases(usuariosDao);
    const pedidosUseCases = makePedidosUseCases(pedidosDao);
    const adminUseCases = makeAdminUseCases();

    const loginController = new LoginController(loginUseCases);
    const productosController = new ProductosController(productosUseCases);
    const usuariosController = new UsuariosController(usuariosUseCases);
    const pedidosController = new PedidosController(pedidosUseCases);
    const adminController = new AdminController(adminUseCases);
    const adminAuth = makeAdminAuth(tokenService);
    const userAuth = makeUserAuth(tokenService);

    const router = createRouter({
        productosController,
        loginController,
        usuariosController,
        adminController,
        pedidosController,
        adminAuth,
        userAuth,
    });

    return { router };
}

export default buildContainer;
