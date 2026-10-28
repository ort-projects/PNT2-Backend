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

interface RouterDependencies {
  productosController: ProductosController;
  loginController: LoginController;
  adminController: AdminController;
  usuariosController: UsuariosController;
  pedidosController: PedidosController;
  adminAuth: RequestHandler;
  userAuth: RequestHandler;
}

export default function createRouter({ productosController, loginController, adminController, usuariosController, pedidosController, adminAuth, userAuth }: RouterDependencies) {
  const router = Router();
  
  router.use("/productos", createProductosRoutes(productosController));
  router.use("/login", createLoginRoutes(loginController));
  router.use("/usuarios", createUsuariosRoutes(usuariosController));
  router.use("/pedidos", createPedidosRoutes(pedidosController, userAuth, adminAuth));
  router.use("/admin", createAdminRoutes(adminController, adminAuth));
  
  return router;
}
