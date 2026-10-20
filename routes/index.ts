import { Router } from "express";
import type { RequestHandler } from "express";
import createCarritosRoutes from "./carritosRoutes.js";
import createProductosRoutes from "./productosRoutes.js";
import createLoginRoutes from "./loginRoutes.js";
import createAdminRoutes from './adminRoutes.js';
import type CarritosController from "../controllers/carritosController.js";
import type ProductosController from "../controllers/productosController.js";
import type LoginController from "../controllers/loginController.js";
import type AdminController from "../controllers/adminController.js";

interface RouterDependencies {
  carritosController: CarritosController;
  productosController: ProductosController;
  loginController: LoginController;
  adminController: AdminController;
  adminAuth: RequestHandler;
}

export default function createRouter({ carritosController, productosController, loginController, adminController, adminAuth }: RouterDependencies) {
  const router = Router();
  
  router.use("/carritos", createCarritosRoutes(carritosController));
  router.use("/productos", createProductosRoutes(productosController));
  router.use("/login", createLoginRoutes(loginController));
  router.use("/admin", createAdminRoutes(adminController, adminAuth));
  
  return router;
}