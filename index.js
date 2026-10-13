import express from "express"
import CarritosController from './controllers/carritosController.js'
import LoginController from "./controllers/loginController.js";
import ProductosController from "./controllers/productosController.js";
import notFound from './middlewares/notFound.js'
import errorHandler from "./middlewares/errorHandler.js";
import createRouter from "./routes/index.js";
import makeProductoUseCases from './useCases/productos/makeProductosUseCases.js'
import { productosDao } from "./daos/productosDao.js";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use(createRouter(new CarritosController(), new ProductosController(makeProductoUseCases(productosDao)), new LoginController()));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});