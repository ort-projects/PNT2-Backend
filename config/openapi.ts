const errorResponse = {
  type: "object",
  properties: {
    error: {
      type: "object",
      properties: {
        code: { type: "string", example: "VALIDACION" },
        message: { type: "string", example: "Datos inválidos" },
        details: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["code", "message"],
    },
  },
  required: ["error"],
} as const;

const jsonResponse = (schema: object) => ({
  "application/json": { schema },
});

const success = (description: string, schema: object) => ({
  description,
  content: jsonResponse(schema),
});

const errors = (statusCodes: number[] = [400, 401, 403, 404, 500]) =>
  Object.fromEntries(statusCodes.map((status) => [String(status), success("Error de la solicitud", errorResponse)]));

const idParameter = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "integer", minimum: 1 },
};

const bearer = [{ bearerAuth: [] }];

const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "PNT2 API",
    version: "1.0.0",
    description: "Documentación de la API REST del proyecto integrador.",
  },
  servers: [{ url: "/", description: "Servidor actual" }],
  tags: [
    { name: "Productos", description: "Consulta del catálogo" },
    { name: "Autenticación", description: "Registro e inicio de sesión" },
    { name: "Usuarios", description: "Gestión de usuarios" },
    { name: "Carrito", description: "Carrito del usuario autenticado" },
    { name: "Pedidos", description: "Pedidos de compra" },
    { name: "Administración", description: "Operaciones de administración" },
  ],
  paths: {
    "/productos": {
      get: {
        tags: ["Productos"],
        summary: "Listar productos",
        responses: {
          "200": success("Lista de productos", { type: "array", items: { $ref: "#/components/schemas/Producto" } }),
          ...errors([500]),
        },
      },
    },
    "/productos/{id}": {
      get: {
        tags: ["Productos"],
        summary: "Obtener un producto",
        parameters: [idParameter],
        responses: {
          "200": success("Producto encontrado", { $ref: "#/components/schemas/Producto" }),
          ...errors([400, 404, 500]),
        },
      },
    },
    "/login": {
      post: {
        tags: ["Autenticación"],
        summary: "Iniciar sesión",
        requestBody: { required: true, content: jsonResponse({ $ref: "#/components/schemas/LoginInput" }) },
        responses: {
          "200": success("Token JWT", { type: "object", properties: { token: { type: "string" } }, required: ["token"] }),
          ...errors([400, 500]),
        },
      },
    },
    "/usuarios": {
      post: {
        tags: ["Usuarios"],
        summary: "Crear una cuenta",
        requestBody: { required: true, content: jsonResponse({ $ref: "#/components/schemas/UsuarioInput" }) },
        responses: {
          "201": success("Usuario creado", { $ref: "#/components/schemas/Usuario" }),
          ...errors([400, 409, 500]),
        },
      },
      get: {
        tags: ["Usuarios"],
        summary: "Listar usuarios",
        security: bearer,
        responses: {
          "200": success("Lista de usuarios", { type: "array", items: { $ref: "#/components/schemas/Usuario" } }),
          ...errors([401, 403, 500]),
        },
      },
    },
    "/usuarios/{id}": {
      get: {
        tags: ["Usuarios"],
        summary: "Obtener un usuario",
        security: bearer,
        parameters: [idParameter],
        responses: {
          "200": success("Usuario encontrado", { $ref: "#/components/schemas/Usuario" }),
          ...errors([401, 403, 404, 500]),
        },
      },
    },
    "/carrito": {
      get: {
        tags: ["Carrito"],
        summary: "Consultar carrito",
        security: bearer,
        responses: { "200": success("Carrito actual", { $ref: "#/components/schemas/Carrito" }), ...errors([401, 404, 500]) },
      },
      put: {
        tags: ["Carrito"],
        summary: "Guardar carrito",
        security: bearer,
        requestBody: { required: true, content: jsonResponse({ $ref: "#/components/schemas/CarritoInput" }) },
        responses: { "200": success("Carrito guardado", { $ref: "#/components/schemas/Carrito" }), ...errors([400, 401, 404, 409, 500]) },
      },
    },
    "/carrito/importar": {
      post: {
        tags: ["Carrito"],
        summary: "Importar carrito",
        security: bearer,
        requestBody: { required: true, content: jsonResponse({ $ref: "#/components/schemas/CarritoImportInput" }) },
        responses: { "200": success("Carrito importado", { $ref: "#/components/schemas/Carrito" }), ...errors([400, 401, 404, 500]) },
      },
    },
    "/pedidos": {
      post: {
        tags: ["Pedidos"],
        summary: "Crear un pedido",
        description: "Se puede enviar una lista de productos o la versión del carrito guardado.",
        security: bearer,
        requestBody: { required: true, content: jsonResponse({ $ref: "#/components/schemas/PedidoInput" }) },
        responses: { "201": success("Pedido creado", { $ref: "#/components/schemas/Pedido" }), ...errors([400, 401, 404, 409, 500]) },
      },
      get: {
        tags: ["Pedidos"],
        summary: "Listar mis pedidos",
        security: bearer,
        responses: { "200": success("Pedidos del usuario autenticado", { type: "array", items: { $ref: "#/components/schemas/Pedido" } }), ...errors([401, 500]) },
      },
    },
    "/pedidos/all": {
      get: {
        tags: ["Pedidos"],
        summary: "Listar todos los pedidos",
        security: bearer,
        parameters: [
          { name: "username", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { $ref: "#/components/schemas/EstadoPedido" } },
        ],
        responses: { "200": success("Pedidos encontrados", { type: "array", items: { $ref: "#/components/schemas/Pedido" } }), ...errors([400, 401, 403, 500]) },
      },
    },
    "/pedidos/{id}": {
      patch: {
        tags: ["Pedidos"],
        summary: "Actualizar estado de un pedido",
        security: bearer,
        parameters: [idParameter],
        requestBody: { required: true, content: jsonResponse({ type: "object", properties: { status: { $ref: "#/components/schemas/EstadoPedido" } }, required: ["status"], additionalProperties: false }) },
        responses: { "200": success("Pedido actualizado", { $ref: "#/components/schemas/Pedido" }), ...errors([400, 401, 403, 404, 500]) },
      },
    },
    "/admin/dashboard": {
      get: {
        tags: ["Administración"],
        summary: "Consultar datos del panel",
        security: bearer,
        parameters: [{ name: "selectedYear", in: "query", description: "Año a consultar (entre 2000 y el año actual).", schema: { type: "string", pattern: "^[0-9]{4}$" } }],
        responses: {
          "200": success("Datos del panel", {
            type: "object",
            properties: {
              anio: { type: "integer" },
              ventas: { type: "array", items: { type: "object", properties: { id: { type: "integer" }, fecha: { type: "string", format: "date" }, productos: { type: "array", items: { type: "object", properties: { productoId: { type: "integer" }, nombre: { type: "string" }, cantidad: { type: "integer" }, precio: { type: "number" } } } } } } },
              productos: { type: "array", items: { type: "object", properties: { id: { type: "integer" }, nombre: { type: "string" }, categoria: { type: "string" }, precio: { type: "number" }, imagen: { type: "string" }, destacado: { type: "boolean" } } } },
            },
          }),
          ...errors([401, 403, 500]),
        },
      },
    },
    "/admin/productos/{id}": {
      patch: {
        tags: ["Administración"],
        summary: "Actualizar un producto",
        security: bearer,
        parameters: [idParameter],
        requestBody: { required: true, content: jsonResponse({ $ref: "#/components/schemas/ProductoPatch" }) },
        responses: { "200": success("Producto actualizado", { $ref: "#/components/schemas/Producto" }), ...errors([400, 401, 403, 404, 500]) },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT", description: "Ingresá el token devuelto por POST /login." },
    },
    schemas: {
      Producto: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 }, title: { type: "string" }, description: { type: "string" },
          category: { type: "string" }, price: { type: "number", minimum: 0 }, thumbnail: { type: "string" }, destacado: { type: "boolean" },
        },
        required: ["id", "title", "description", "category", "price", "thumbnail", "destacado"],
      },
      UsuarioInput: {
        type: "object", additionalProperties: false,
        properties: { username: { type: "string", format: "email" }, name: { type: "string", minLength: 1 }, surname: { type: "string", minLength: 1 }, password: { type: "string", minLength: 8, format: "password" } },
        required: ["username", "name", "surname", "password"],
      },
      Usuario: {
        type: "object",
        properties: { id: { type: "integer" }, username: { type: "string", format: "email" }, name: { type: "string" }, surname: { type: "string" }, role: { type: "string", enum: ["admin", "user"] } },
        required: ["id", "username", "name", "surname", "role"],
      },
      LoginInput: {
        type: "object", additionalProperties: false,
        properties: { username: { type: "string", format: "email" }, password: { type: "string", minLength: 8, format: "password" } },
        required: ["username", "password"],
      },
      CarritoItem: {
        type: "object", additionalProperties: false,
        properties: { productId: { type: "integer", minimum: 1 }, quantity: { type: "integer", minimum: 1 } }, required: ["productId", "quantity"],
      },
      CarritoInput: {
        type: "object", additionalProperties: false,
        properties: { version: { type: "integer", minimum: 1 }, items: { type: "array", items: { $ref: "#/components/schemas/CarritoItem" } } }, required: ["version", "items"],
      },
      CarritoImportInput: {
        type: "object", additionalProperties: false,
        properties: { importId: { type: "string", minLength: 1, maxLength: 100 }, items: { type: "array", items: { $ref: "#/components/schemas/CarritoItem" } } }, required: ["importId", "items"],
      },
      Carrito: {
        type: "object", properties: { version: { type: "integer" }, items: { type: "array", items: { $ref: "#/components/schemas/CarritoItem" } } }, required: ["version", "items"],
      },
      PedidoInput: {
        oneOf: [
          { type: "object", additionalProperties: false, properties: { items: { type: "array", minItems: 1, items: { $ref: "#/components/schemas/CarritoItem" } } }, required: ["items"] },
          { type: "object", additionalProperties: false, properties: { carritoVersion: { type: "integer", minimum: 1 } }, required: ["carritoVersion"] },
        ],
      },
      EstadoPedido: { type: "string", enum: ["pendiente", "enviado", "entregado", "cancelado"] },
      Pedido: {
        type: "object",
        properties: {
          id: { type: "integer" }, date: { type: "string", format: "date-time" }, status: { $ref: "#/components/schemas/EstadoPedido" }, total: { type: "number" },
          user: { type: "object", properties: { username: { type: "string" }, name: { type: "string" }, surname: { type: "string" } }, required: ["username", "name", "surname"] },
          items: { type: "array", items: { type: "object", properties: { productId: { type: "integer" }, title: { type: "string" }, thumbnail: { type: "string" }, price: { type: "number" }, quantity: { type: "integer" } }, required: ["productId", "title", "thumbnail", "price", "quantity"] } },
        },
        required: ["id", "date", "status", "total", "user", "items"],
      },
      ProductoPatch: {
        type: "object", minProperties: 1, additionalProperties: false,
        properties: { title: { type: "string", minLength: 1 }, description: { type: "string", minLength: 1 }, category: { type: "string", minLength: 1 }, price: { type: "number", exclusiveMinimum: 0 }, thumbnail: { type: "string", minLength: 1 }, destacado: { type: "boolean" } },
      },
    },
  },
};

export default openApiDocument;
