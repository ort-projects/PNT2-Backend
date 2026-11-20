import { Router } from "express";
import type { RequestHandler } from "express";
import createProductosRoutes from "./productosRoutes.js";
import createLoginRoutes from "./loginRoutes.js";
import createAdminRoutes from './adminRoutes.js';
import createUsuariosRoutes from "./usuariosRoutes.js";
import createPedidosRoutes from "./pedidosRoutes.js";
import type ProductosController from "../controllers/productosController.js";
import type LoginController from "../controllers/loginController.js";
import type AdminController from "../controllers/adminController.js";
import type UsuariosController from "../controllers/usuariosController.js";
import type PedidosController from "../controllers/pedidosController.js";
import createCarritoRoutes from "./carritoRoutes.js";
import type CarritoController from "../controllers/carritoController.js";

interface RouterDependencies {
  productosController: ProductosController;
  loginController: LoginController;
  adminController: AdminController;
  usuariosController: UsuariosController;
  pedidosController: PedidosController;
  carritoController: CarritoController;
  adminAuth: RequestHandler;
  userAuth: RequestHandler;
}

export default function createRouter({ productosController, loginController, adminController, usuariosController, pedidosController, carritoController, adminAuth, userAuth }: RouterDependencies) {
  const router = Router();
  
  router.use("/productos", createProductosRoutes(productosController));
  router.use("/login", createLoginRoutes(loginController));
  router.use("/usuarios", createUsuariosRoutes(usuariosController, adminAuth));
  router.use("/pedidos", createPedidosRoutes(pedidosController, userAuth, adminAuth));
  router.use("/carrito", createCarritoRoutes(carritoController, userAuth));
  router.use("/admin", createAdminRoutes(adminController, adminAuth));
  
  return router;
}
