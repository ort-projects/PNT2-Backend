import { Router } from "express";
import createCarritosRoutes from "./carritosRoutes.js";
import createProductosRoutes from "./productosRoutes.js";
import createLoginRoutes from "./loginRoutes.js";
import createAdminRoutes from './adminRoutes.js';

export default function createRouter({ carritosController, productosController, loginController, adminController, adminAuth }) {
  const router = Router();
  
  router.use("/carritos", createCarritosRoutes(carritosController));
  router.use("/productos", createProductosRoutes(productosController));
  router.use("/login", createLoginRoutes(loginController));
  router.use("/admin", createAdminRoutes(adminController, adminAuth));
  
  return router;
}