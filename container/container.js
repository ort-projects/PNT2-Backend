import CarritosController from "../controllers/carritosController.js";
import LoginController from "../controllers/loginController.js";
import ProductosController from "../controllers/productosController.js";
import AdminController from "../controllers/adminController.js";
import { carritosDao } from "../daos/carritosDao.js";
import { productosDao } from "../daos/productosDao.js";
import { usuariosDao } from "../daos/usuariosDao.js";
import makeAdminAuth from "../middlewares/adminAuth.js";
import makeAdminUseCases from "../useCases/admin/makeAdminUseCases.js";
import makeCarritosUseCases from "../useCases/carritos/makeCarritosUseCases.js";
import makeLoginUseCases from "../useCases/login/makeLoginUseCases.js";
import makeProductosUseCases from "../useCases/productos/makeProductosUseCases.js";
import { createToken, verifyToken } from "../adapters/security/jwtTokenService.js";
import createRouter from "../routes/index.js";

function buildContainer() {
    const tokenService = {
        createToken,
        verifyToken,
    };

    const carritosUseCases = makeCarritosUseCases(carritosDao);
    const loginUseCases = makeLoginUseCases({ userRepository: usuariosDao, tokenService });
    const productosUseCases = makeProductosUseCases(productosDao);
    const adminUseCases = makeAdminUseCases();

    const carritosController = new CarritosController(carritosUseCases);
    const loginController = new LoginController(loginUseCases);
    const productosController = new ProductosController(productosUseCases);
    const adminController = new AdminController(adminUseCases);
    const adminAuth = makeAdminAuth(tokenService);

    const router = createRouter({
        carritosController,
        productosController,
        loginController,
        adminController,
        adminAuth,
    });

    return { router };
}

export default buildContainer;
