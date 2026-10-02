import { Router } from "express";
import createCarritosRoutes from "./carritosRoutes.js";
import createProductosRoutes from "./productosRoutes.js";
import createLoginRoutes from "./loginRoutes.js";

function createRouter(carritosController, productosController, loginController) {
  const router = Router();
  
  router.use("/carritos", createCarritosRoutes(carritosController));
  router.use("/productos", createProductosRoutes(productosController));
  router.use("/login", createLoginRoutes(loginController));
  
  return router;
}

export default createRouter;