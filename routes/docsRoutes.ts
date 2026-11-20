import { Router } from "express";
import openApiDocument from "../config/openapi.js";

const swaggerUiHtml = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Swagger UI - PNT2 API</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => SwaggerUIBundle({ url: '/openapi.json', dom_id: '#swagger-ui', deepLinking: true });
    </script>
  </body>
</html>`;

const docsRouter = Router();

docsRouter.get("/docs", (_req, res) => {
  res.type("html").send(swaggerUiHtml);
});

docsRouter.get("/openapi.json", (_req, res) => {
  res.json(openApiDocument);
});

export default docsRouter;
