# 📋 Tareas pendientes — Backend

Lo que falta en el backend para que el front pueda cerrar las tareas de `PENDIENTE.md` del repo del front (`pnt2-integrador`) (flujo de compra, pedidos y ofertas).

**Equipo:** Dana · Gonza · Gabriel

---

## 🎯 Resumen

| # | Tarea | Desbloquea (front) | Prioridad | Responsable | Estado |
|:-:|-------|:------------------:|:---------:|:-----------:|:------:|
| B1 | Crear pedido (`POST /pedidos`) | #1, #2 | ![Alta](https://img.shields.io/badge/prioridad-ALTA-d73a49?style=flat-square) | ![Gonza](https://img.shields.io/badge/-Gonza-0366d6?style=flat-square) | ![Hecho](https://img.shields.io/badge/-hecho-28a745?style=flat-square) |
| B2 | Pedidos con detalle de productos y total | #3, #5 | ![Alta](https://img.shields.io/badge/prioridad-ALTA-d73a49?style=flat-square) | ![Gabriel](https://img.shields.io/badge/-Gabriel-0366d6?style=flat-square) | ![Hecho](https://img.shields.io/badge/-hecho-28a745?style=flat-square) |
| B3 | Estado del pedido | #3, #5 | ![Media](https://img.shields.io/badge/prioridad-MEDIA-f9a825?style=flat-square) | ![Gabriel](https://img.shields.io/badge/-Gabriel-0366d6?style=flat-square) | ![Hecho](https://img.shields.io/badge/-hecho-28a745?style=flat-square) |
| B4 | Registro de usuario (`POST /usuarios`) | #4 | ![Alta](https://img.shields.io/badge/prioridad-ALTA-d73a49?style=flat-square) | ![Gonza](https://img.shields.io/badge/-Gonza-0366d6?style=flat-square) | ![Hecho](https://img.shields.io/badge/-hecho-28a745?style=flat-square) |
| B5 | Proteger `GET /usuarios` y no devolver la contraseña | #6 | ![Alta](https://img.shields.io/badge/prioridad-ALTA-d73a49?style=flat-square) | ![Gabriel](https://img.shields.io/badge/-Gabriel-0366d6?style=flat-square) | ![Hecho](https://img.shields.io/badge/-hecho-28a745?style=flat-square) |
| B6 | Filtro de pedidos por usuario (`GET /pedidos/all?username=`) | #6 | ![Baja](https://img.shields.io/badge/prioridad-BAJA-28a745?style=flat-square) | ![Dana](https://img.shields.io/badge/-Dana-0366d6?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B7 | Ofertas semanales: modelo y alta (admin) | #7 | ![A definir](https://img.shields.io/badge/prioridad-A%20DEFINIR-lightgrey?style=flat-square) | ![Gonza](https://img.shields.io/badge/-Gonza-0366d6?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B8 | Ofertas vigentes (`GET /ofertas`) y descuento al comprar | #8 | ![A definir](https://img.shields.io/badge/prioridad-A%20DEFINIR-lightgrey?style=flat-square) | ![Gonza](https://img.shields.io/badge/-Gonza-0366d6?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B9 | Cambiar el estado de un pedido (admin) | — | ![Baja](https://img.shields.io/badge/prioridad-BAJA-28a745?style=flat-square) | ![Dana](https://img.shields.io/badge/-Dana-0366d6?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B10 | Filtro de pedidos por estado (`GET /pedidos/all?status=`) | #5 | ![Baja](https://img.shields.io/badge/prioridad-BAJA-28a745?style=flat-square) | ![Dana](https://img.shields.io/badge/-Dana-0366d6?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |

> La tarea #2 del front (mensaje de éxito, vaciar carrito, redirección) es solo de front: no necesita nada nuevo del backend.

### Referencias

| Prioridad | Significado |
|-----------|-------------|
| ![Alta](https://img.shields.io/badge/-ALTA-d73a49?style=flat-square) | Bloqueante para la entrega. Se hace primero. |
| ![Media](https://img.shields.io/badge/-MEDIA-f9a825?style=flat-square) | Necesaria, pero no bloquea otras tareas. |
| ![Baja](https://img.shields.io/badge/-BAJA-28a745?style=flat-square) | Mejora o detalle; se hace si queda tiempo. |
| ![A definir](https://img.shields.io/badge/-A%20DEFINIR-lightgrey?style=flat-square) | Todavía no se definió la prioridad. |

| Estado | Significado |
|--------|-------------|
| ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) | Sin empezar |
| ![En curso](https://img.shields.io/badge/-en%20curso-f9a825?style=flat-square) | Alguien la está haciendo |
| ![Hecho](https://img.shields.io/badge/-hecho-28a745?style=flat-square) | Terminada en el código |

### Contrato de API para el front

Las rutas que el front tiene marcadas como "confirmar con backend":

| Método | Ruta | Auth | Body / query | Respuesta | Estado |
|:------:|------|:----:|--------------|-----------|:------:|
| `POST` | `/login` | — | `{ username, password }` | `200 { token }` | ✅ existe |
| `POST` | `/pedidos` | user | `{ items: [{ productId, quantity }] }` | `201` pedido creado | ✅ existe |
| `GET` | `/pedidos` | user | — | `200` pedidos del usuario logueado, con detalle y `total` | ✅ existe |
| `GET` | `/pedidos/all` | admin | `?username=` (B6), `?status=` (B10) | `200` todos los pedidos, con detalle, `total`, `status` y usuario | ✅ existe (faltan filtros, B6 y B10) |
| `POST` | `/usuarios` | — | `{ username, name, surname, password }` | `201` usuario sin `password` (sin token) | ✅ existe |
| `GET` | `/usuarios` | admin | — | `200` usuarios sin `password` | ✅ existe (también `GET /usuarios/:id`, admin) |
| `PATCH` | `/pedidos/:id` | admin | `{ status }` | `200` pedido actualizado | ❌ falta (B9) |
| `GET` | `/admin/dashboard` | admin | `?selectedYear=` | `200 { anio, ventas, productos }` con pedidos reales | ✅ existe |
| `PATCH` | `/admin/productos/:id` | admin | campos de producto (incl. `destacado`), al menos uno | `200` producto actualizado | ✅ existe |
| `POST` | `/ofertas` | admin | `{ productId, discount, ... }` | `201` | ❌ falta (B7) |
| `GET` | `/ofertas` | — | — | `200` ofertas vigentes | ❌ falta (B8) |

Los errores siguen el formato del `errorHandler`: `{ error: { code, message, details? } }`. El front debe leer `data.error.message`.

---

## ✅ Tarea B1 — Crear pedido

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Alta](https://img.shields.io/badge/-ALTA-d73a49?style=flat-square) | Front #1, #2 | `routes/pedidosRoutes.ts`, `useCases/pedidos/createOrder.ts`, `daos/pedidosDao.ts` |

**Ya está hecho.** `POST /pedidos` con `userAuth`:

- Sin token o con token vencido → `401` (`TOKEN_MISSING` / `TOKEN_INVALID`), que es lo que el front usa para abrir el modal de login.
- Items vacíos o inválidos → `400 VALIDACION` con `details` por campo (validado con Zod en `schemas/orderSchema.ts`).
- Producto inexistente → `404` (`PRODUCTO_NO_ENCONTRADO`).
- OK → `201` con el pedido creado. El precio de cada ítem se toma del producto en la base, no del front.

El payload que manda `Cart.vue` (`{ items: [{ productId, quantity }] }`) ya coincide con lo que espera el backend.

---

## ✅ Tarea B2 — Pedidos con detalle de productos y total

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Alta](https://img.shields.io/badge/-ALTA-d73a49?style=flat-square) | Front #3, #5 | `daos/pedidosDao.ts`, `types/entities.ts`, `types/daos.ts` |

**Objetivo:** que `GET /pedidos` y `GET /pedidos/all` devuelvan lo que las tablas del front necesitan mostrar (productos, total, usuario).

**Qué falta hoy**

- Los ítems vienen solo con `productId`: no hay nombre ni imagen del producto.
- No se devuelve el **total** del pedido.
- En `GET /pedidos/all` el usuario viene solo con `username`, sin nombre y apellido.
- `PedidosDao` devuelve `unknown` en los tipos.

**Requisitos**

- Incluir en cada ítem el producto (`title`, `thumbnail`) con `include: { items: { include: { product: { select: ... } } } }`.
- Calcular `total` (suma de `price * quantity`) y agregarlo a cada pedido.
- En `/pedidos/all`, incluir `name` y `surname` del usuario (nunca `password`).
- Tipar las respuestas en `types/entities.ts` / `types/daos.ts` en vez de `unknown`.

**Criterios de aceptación**

- [x] Cada pedido trae `id`, `date`, `total` e ítems con `title`, `thumbnail`, `price` y `quantity`.
- [x] `/pedidos/all` trae el usuario con `username`, `name` y `surname`.
- [x] Ninguna respuesta incluye la contraseña.

---

## ✅ Tarea B3 — Estado del pedido

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Media](https://img.shields.io/badge/-MEDIA-f9a825?style=flat-square) | Front #3, #5 | `prisma/schema.prisma`, `prisma/migrations/20261103224347_estado_pedido`, `daos/queries/pedidoConDetalle.ts`, `useCases/pedidos/toPedido.ts`, `types/entities.ts` |

**Ya está hecho.** `Pedido` tiene el campo `status` (enum `EstadoPedido`) con default `pendiente`.

- Estados posibles: `pendiente`, `enviado`, `entregado`, `cancelado`.
- `GET /pedidos` y `GET /pedidos/all` devuelven `status` en cada pedido.
- Por ahora **nadie puede cambiar el estado**: todos los pedidos quedan en `pendiente`. Cambiarlo es la tarea B9.
- Tras el merge de `statuspedido` el enum había quedado duplicado (una versión con `completado`). Se dejó solo la de 4 estados, en `schema.prisma` y en `types/entities.ts`.

**Criterios de aceptación**

- [x] Los pedidos nuevos se crean con el estado por defecto.
- [x] Los pedidos existentes quedan con el estado por defecto después de la migración.
- [x] `GET /pedidos` y `GET /pedidos/all` devuelven `status`.

> ⚠️ **Después de hacer pull:** correr `npx prisma migrate dev` para aplicar la migración nueva en tu `dev.db`.

---

## ✅ Tarea B4 — Registro de usuario

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Alta](https://img.shields.io/badge/-ALTA-d73a49?style=flat-square) | Front #4 | `schemas/usuarioSchema.ts`, `useCases/usuarios/createUser.ts`, `daos/usuariosDao.ts`, `controllers/usuariosController.ts`, `routes/usuariosRoutes.ts` |

**Objetivo:** que el modal de "Crear usuario" del front tenga un endpoint al que enviar el alta.

**Implementado**

- Valida email, nombre, apellido y contraseña de al menos 8 caracteres con Zod.
- Expone `POST /usuarios` sin autenticación y valida el body con `usuarioSchema`.
- Hashea la contraseña antes de guardarla y fuerza el rol `user`.
- Si el email ya está registrado, responde `409 USERNAME_EN_USO`.
- Responde `201` con los datos públicos del usuario, sin `password`.

**Criterios de aceptación**

- [x] Datos inválidos → `400 VALIDACION` con `details` por campo.
- [x] Email repetido → `409`.
- [x] No se puede crear un admin desde este endpoint.
- [x] La respuesta no incluye `password`.

**Implementación**

- La contraseña se guarda hasheada con bcrypt (`adapters/security/passwordHasher.ts`, rondas en `BCRYPT_ROUNDS`). El login compara contra el hash.
- La respuesta del alta **no incluye token**: el front hace `POST /login` con las mismas credenciales después del alta (`registerUser` en `src/store/auth.js` del front).

> ⚠️ **Después de hacer pull:** correr `npm install` (dependencia nueva `bcryptjs`) y volver a correr el seed. Las bases locales (`dev.db`) creadas antes de este cambio tienen las contraseñas en texto plano y el login falla hasta reseedear.

---

## ✅ Tarea B5 — Proteger `GET /usuarios`

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Alta](https://img.shields.io/badge/-ALTA-d73a49?style=flat-square) | Front #6 | `routes/usuariosRoutes.ts`, `routes/index.ts`, `daos/usuariosDao.ts`, `useCases/usuarios/getUser.ts` |

**Ya está hecho.** `GET /usuarios` y `GET /usuarios/:id` llevan `adminAuth`; `POST /usuarios` (B4) sigue público.

- Sin token o token inválido → `401` (`TOKEN_MISSING` / `TOKEN_INVALID`). Token de un `user` → `403` (`ADMIN_ROLE_REQUIRED`).
- Los usuarios se devuelven sin `password` (`usuarioPublicoSelect` en `daos/usuariosDao.ts`).
- `GET /usuarios/abc` (id no entero o ≤ 0) → `400` (`ID_INVALIDO`).
- Id inexistente → `404` (`USER_NOT_FOUND`).

**Criterios de aceptación**

- [x] Sin token de admin → `401` / `403`.
- [x] Ninguna respuesta incluye `password`.
- [x] Id inexistente → `404`.

---

## 🟢 Tarea B6 — Filtro de pedidos por usuario

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Baja](https://img.shields.io/badge/-BAJA-28a745?style=flat-square) | Front #6 | `controllers/pedidosController.ts`, `useCases/pedidos/getAll.ts`, `daos/pedidosDao.ts` |

**Responsable:** Dana.

**Objetivo:** que el admin pueda pedir solo los pedidos de un usuario.

**Requisitos**

- Aceptar `?username=` en `GET /pedidos/all` (validado con `validateQuery`) y filtrar en el DAO.
- Sin el parámetro, se devuelven todos como hoy.

**Criterios de aceptación**

- [ ] `GET /pedidos/all?username=x` devuelve solo los pedidos de `x`.
- [ ] Usuario sin pedidos o inexistente → `200 []`.

> 💡 Si la lista de pedidos es chica, el front puede filtrar del lado del cliente con los datos de B2 y esta tarea queda opcional.

> 🔗 **Depende de:** B2.

---

## ⚪ Tarea B7 — Ofertas semanales: modelo y alta

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![A definir](https://img.shields.io/badge/-A%20DEFINIR-lightgrey?style=flat-square) | Front #7 | `prisma/schema.prisma`, migración nueva, archivos nuevos de ofertas (schema, dao, useCases, controller, routes), `container/container.ts`, `routes/index.ts` |

**Responsable:** Gonza.

**Objetivo:** que el admin pueda guardar una oferta (producto + porcentaje de descuento). Hoy no existe nada de ofertas en el backend.

**Requisitos**

- Modelo `Oferta` en Prisma: `productId` (relación con `Producto`), `discount` (entero 1–100) y vigencia.
- Migración nueva.
- `POST /ofertas` con `adminAuth` y schema Zod (`discount` entero entre 1 y 100, `productId` existente).
- Seguir la misma estructura que el resto: DAO + use cases + controller + routes, registrados en el `container`.

**Criterios de aceptación**

- [ ] Solo un admin puede crear ofertas.
- [ ] Porcentaje fuera de rango → `400`.
- [ ] Producto inexistente → `404`.
- [ ] Respuesta `201` con la oferta creada.

> ❓ **A definir (igual que en el front):** vigencia (¿semana calendario o `startDate` / `endDate`?), si un producto puede tener más de una oferta activa, y si hace falta editar / borrar ofertas (`PUT` / `DELETE /ofertas/:id`).

---

## ⚪ Tarea B8 — Ofertas vigentes y descuento al comprar

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![A definir](https://img.shields.io/badge/-A%20DEFINIR-lightgrey?style=flat-square) | Front #8 | archivos de ofertas (B7), `daos/pedidosDao.ts` |

**Responsable:** Gonza.

**Objetivo:** que el Home pueda mostrar las ofertas de la semana y que el descuento se respete al comprar.

**Requisitos**

- `GET /ofertas` público que devuelva solo las ofertas **vigentes**, con el producto incluido (`title`, `thumbnail`, `price`), el `discount` y el precio final ya calculado.
- En `PedidosDao.createOrder`, si el producto tiene una oferta vigente, guardar en `PedidoItem.price` el precio **con descuento**. Si no, lo que pague el usuario no va a coincidir con lo que vio en el Home.

**Criterios de aceptación**

- [ ] `GET /ofertas` no devuelve ofertas vencidas ni futuras.
- [ ] Cada oferta trae precio original, descuento y precio final.
- [ ] Un pedido con un producto en oferta se guarda con el precio con descuento.
- [ ] Sin ofertas vigentes → `200 []`.

> 🔗 **Depende de:** B7.

---

## 🟢 Tarea B9 — Cambiar el estado de un pedido

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Baja](https://img.shields.io/badge/-BAJA-28a745?style=flat-square) | — | `routes/pedidosRoutes.ts`, `controllers/pedidosController.ts`, `useCases/pedidos/`, `daos/pedidosDao.ts`, schema Zod nuevo |

**Responsable:** Dana.

**Objetivo:** hoy todos los pedidos quedan en `pendiente` para siempre (B3). Esta tarea agrega la forma de que el admin cambie el estado.

**Requisitos**

- `PATCH /pedidos/:id` con `adminAuth` y body `{ status }`, validado con Zod (`z.enum(["pendiente", "enviado", "entregado", "cancelado"])`).
- Pedido inexistente → `404`. Id inválido → `400`.

**Criterios de aceptación**

- [ ] Solo un admin puede cambiar el estado.
- [ ] Estado fuera de la lista → `400 VALIDACION`.
- [ ] Respuesta `200` con el pedido actualizado.

> 💡 Las otras rutas de admin que modifican datos están bajo `/admin` (`PATCH /admin/productos/:id`). Se puede usar `PATCH /admin/pedidos/:id` por consistencia; avisar al front la ruta elegida.

> ❓ **A definir:** si hay transiciones prohibidas (ej. de `entregado` o `cancelado` no se puede volver a `pendiente`).

> 🔗 **Depende de:** B3.

---

## 🟢 Tarea B10 — Filtro de pedidos por estado

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Baja](https://img.shields.io/badge/-BAJA-28a745?style=flat-square) | Front #5 | `routes/pedidosRoutes.ts`, `controllers/pedidosController.ts`, `useCases/pedidos/getAll.ts`, `daos/pedidosDao.ts`, schema Zod de query |

**Responsable:** Dana.

**Objetivo:** que el admin pueda listar solo los pedidos en un estado (ej. los `pendiente` para despacharlos).

**Requisitos**

- Aceptar `?status=` en `GET /pedidos/all`, validado con `validateQuery` y `z.enum(["pendiente", "enviado", "entregado", "cancelado"])`.
- Filtrar en el DAO (`where: { status }`).
- Se puede combinar con `?username=` de B6: conviene hacer las dos en el mismo schema de query.
- Sin el parámetro, se devuelven todos como hoy.

**Criterios de aceptación**

- [ ] `GET /pedidos/all?status=pendiente` devuelve solo pedidos pendientes.
- [ ] Estado fuera de la lista → `400 VALIDACION`.
- [ ] `?status=` y `?username=` juntos aplican los dos filtros.
- [ ] Sin pedidos en ese estado → `200 []`.

> 🔗 **Depende de:** B3. Tiene más sentido una vez hecha B9 (si no, todos los pedidos están en `pendiente`).

---

## 📝 Detectado de paso (fuera de las tareas del front)

- ~~`GET /admin/dashboard` devuelve **datos inventados**.~~ Resuelto: arma las ventas con los pedidos reales del año elegido.
- ~~Las contraseñas se guardan y comparan **en texto plano** (`useCases/login/login.ts`).~~ Resuelto con bcrypt (ver B4).
- `pruebas.http` no tiene requests de login, pedidos ni admin.
- Las migraciones `20261103200628_estado_pedido` y `20261103224347_estado_pedido` son idénticas (quedaron del merge). No rompen nada, pero la segunda vuelve a dejar todos los pedidos en `pendiente`. No borrarlas si ya se aplicaron en las bases locales.
- El seed ahora carga 18 productos de moda (categorías `camisas`, `vestidos`, `calzado`, `carteras`, `anteojos`, `accesorios`). ⚠️ **Después de hacer pull:** volver a correr el seed. Para tener ventas con todos los productos, hay que partir de una base vacía, porque el seed no crea ventas si ya hay pedidos.

---

> 📝 _Este documento se va ampliando a medida que se definen nuevas tareas._
