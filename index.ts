import express from "express"
import notFound from './middlewares/notFound.js'
import errorHandler from "./middlewares/errorHandler.js";
import buildContainer from "./container/container.js";
import cors from "cors"
import { PORT } from "./config/config.js";

const app = express();

app.use(cors());
app.use(express.json());


const container = buildContainer();
app.use(container.router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
