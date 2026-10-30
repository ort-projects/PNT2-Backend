# 📋 Tareas pendientes — Backend

Lo que falta en el backend para que el front pueda cerrar las tareas de `PENDIENTE.md` del repo del front (`pnt2-integrador`) (flujo de compra, pedidos y ofertas).

**Equipo:** Dana · Gonza · Gabriel

---

## 🎯 Resumen

| # | Tarea | Desbloquea (front) | Prioridad | Responsable | Estado |
|:-:|-------|:------------------:|:---------:|:-----------:|:------:|
| B1 | Crear pedido (`POST /pedidos`) | #1, #2 | ![Alta](https://img.shields.io/badge/prioridad-ALTA-d73a49?style=flat-square) | ![Sin asignar](https://img.shields.io/badge/-sin%20asignar-555555?style=flat-square) | ![Hecho](https://img.shields.io/badge/-hecho-28a745?style=flat-square) |
| B2 | Pedidos con detalle de productos y total | #3, #5 | ![Alta](https://img.shields.io/badge/prioridad-ALTA-d73a49?style=flat-square) | ![Sin asignar](https://img.shields.io/badge/-sin%20asignar-555555?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B3 | Estado del pedido | #3, #5 | ![Media](https://img.shields.io/badge/prioridad-MEDIA-f9a825?style=flat-square) | ![Sin asignar](https://img.shields.io/badge/-sin%20asignar-555555?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B4 | Registro de usuario (`POST /usuarios`) | #4 | ![Alta](https://img.shields.io/badge/prioridad-ALTA-d73a49?style=flat-square) | ![Sin asignar](https://img.shields.io/badge/-sin%20asignar-555555?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B5 | Proteger `GET /usuarios` y no devolver la contraseña | #6 | ![Alta](https://img.shields.io/badge/prioridad-ALTA-d73a49?style=flat-square) | ![Sin asignar](https://img.shields.io/badge/-sin%20asignar-555555?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B6 | Filtro de pedidos por usuario (`GET /pedidos/all?username=`) | #6 | ![Baja](https://img.shields.io/badge/prioridad-BAJA-28a745?style=flat-square) | ![Sin asignar](https://img.shields.io/badge/-sin%20asignar-555555?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B7 | Ofertas semanales: modelo y alta (admin) | #7 | ![A definir](https://img.shields.io/badge/prioridad-A%20DEFINIR-lightgrey?style=flat-square) | ![Sin asignar](https://img.shields.io/badge/-sin%20asignar-555555?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |
| B8 | Ofertas vigentes (`GET /ofertas`) y descuento al comprar | #8 | ![A definir](https://img.shields.io/badge/prioridad-A%20DEFINIR-lightgrey?style=flat-square) | ![Sin asignar](https://img.shields.io/badge/-sin%20asignar-555555?style=flat-square) | ![Pendiente](https://img.shields.io/badge/-pendiente-lightgrey?style=flat-square) |

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
| ![Hecho](https://img.shields.io/badge/-hecho-28a745?style=flat-square) | Terminada y mergeada |

### Contrato de API para el front

Las rutas que el front tiene marcadas como "confirmar con backend":

| Método | Ruta | Auth | Body / query | Respuesta | Estado |
|:------:|------|:----:|--------------|-----------|:------:|
| `POST` | `/login` | — | `{ username, password }` | `200 { token }` | ✅ existe |
| `POST` | `/pedidos` | user | `{ items: [{ productId, quantity }] }` | `201` pedido creado | ✅ existe |
| `GET` | `/pedidos` | user | — | `200` pedidos del usuario logueado | ✅ existe (falta detalle, ver B2) |
| `GET` | `/pedidos/all` | admin | `?username=` (B6) | `200` todos los pedidos | ✅ existe (falta detalle y filtro) |
| `POST` | `/usuarios` | — | `{ username, name, surname, password }` | `201` | ❌ falta (B4) |
| `GET` | `/usuarios` | admin | — | `200` usuarios sin `password` | ⚠️ hoy es público (B5) |
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
- Items vacíos o inválidos → `400` (`ITEMS_INVALIDOS` / `ITEM_INVALIDO`).
- Producto inexistente → `404` (`PRODUCTO_NO_ENCONTRADO`).
- OK → `201` con el pedido creado. El precio de cada ítem se toma del producto en la base, no del front.

El payload que manda `Cart.vue` (`{ items: [{ productId, quantity }] }`) ya coincide con lo que espera el backend.

---

## 🔴 Tarea B2 — Pedidos con detalle de productos y total

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

- [ ] Cada pedido trae `id`, `date`, `total` e ítems con `title`, `thumbnail`, `price` y `quantity`.
- [ ] `/pedidos/all` trae el usuario con `username`, `name` y `surname`.
- [ ] Ninguna respuesta incluye la contraseña.

---

## 🟡 Tarea B3 — Estado del pedido

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Media](https://img.shields.io/badge/-MEDIA-f9a825?style=flat-square) | Front #3, #5 | `prisma/schema.prisma`, migración nueva, `types/entities.ts` |

**Objetivo:** las tablas del front muestran una columna **estado**, pero el modelo `Pedido` no tiene ese campo.

**Requisitos**

- Agregar un enum (ej. `EstadoPedido`) y el campo `status` a `Pedido`, con valor por defecto.
- Crear la migración con `prisma migrate dev`.
- Devolver `status` en los listados de pedidos.

**Criterios de aceptación**

- [ ] Los pedidos nuevos se crean con el estado por defecto.
- [ ] Los pedidos existentes quedan con el estado por defecto después de la migración.
- [ ] `GET /pedidos` y `GET /pedidos/all` devuelven `status`.

> ❓ **A definir:** qué estados existen (ej. `pendiente`, `enviado`, `entregado`, `cancelado`) y si el admin puede cambiarlo (eso sería un `PATCH /pedidos/:id` extra).

---

## 🔴 Tarea B4 — Registro de usuario

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Alta](https://img.shields.io/badge/-ALTA-d73a49?style=flat-square) | Front #4 | `schemas/usuarioSchema.ts`, `useCases/usuarios/createUser.ts`, `daos/usuariosDao.ts`, `controllers/usuariosController.ts`, `routes/usuariosRoutes.ts` |

**Objetivo:** que el modal de "Crear usuario" del front tenga un endpoint al que enviar el alta. Hoy `createUser.ts` y `usuarioSchema.ts` existen pero están **vacíos**, y no hay ruta `POST /usuarios`.

**Requisitos**

- Schema Zod en `usuarioSchema.ts` con las mismas reglas que `loginSchema` para `username` (email) y `password` (mín. 8), más `name` y `surname` obligatorios.
- Ruta `POST /usuarios` con `validateBody(usuarioSchema)`.
- Caso de uso `createUser` y método `createUser` en `UsuariosDao` (y en la interfaz de `types/daos.ts`).
- El rol se fuerza a `user` en el backend: no se acepta `role` desde el body.
- Si el `username` ya existe → `409` con un código claro (ej. `USERNAME_EN_USO`), para que el front muestre "email ya registrado".
- Responder `201` con el usuario creado **sin la contraseña**.

**Criterios de aceptación**

- [ ] Datos inválidos → `400 VALIDACION` con `details` por campo.
- [ ] Email repetido → `409`.
- [ ] No se puede crear un admin desde este endpoint.
- [ ] La respuesta no incluye `password`.

> ❓ **A definir con front:** si la respuesta del alta incluye el `token` (así el usuario queda logueado y vuelve directo a confirmar la compra) o si el front hace `POST /login` después del alta.

---

## 🔴 Tarea B5 — Proteger `GET /usuarios`

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Alta](https://img.shields.io/badge/-ALTA-d73a49?style=flat-square) | Front #6 | `routes/usuariosRoutes.ts`, `routes/index.ts`, `daos/usuariosDao.ts` |

**Objetivo:** el filtro por usuario del admin necesita la lista de usuarios, pero hoy `GET /usuarios` y `GET /usuarios/:id` son **públicos y devuelven la contraseña** de todos.

**Requisitos**

- Proteger `GET /usuarios` y `GET /usuarios/:id` con `adminAuth` (dejar `POST /usuarios` de B4 público).
- Devolver los usuarios sin `password` (`select` en el DAO).
- `GET /usuarios/:id` con un id inexistente → `404` en vez de `200` vacío.

**Criterios de aceptación**

- [ ] Sin token de admin → `401` / `403`.
- [ ] Ninguna respuesta incluye `password`.

---

## 🟢 Tarea B6 — Filtro de pedidos por usuario

| Prioridad | Desbloquea | Archivos |
|:---------:|:----------:|----------|
| ![Baja](https://img.shields.io/badge/-BAJA-28a745?style=flat-square) | Front #6 | `controllers/pedidosController.ts`, `useCases/pedidos/getAll.ts`, `daos/pedidosDao.ts` |

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

## 📝 Detectado de paso (fuera de las tareas del front)

- `GET /admin/dashboard` devuelve **datos inventados** (`useCases/admin/getDashboardData.ts`). Podría armarse con los pedidos reales del año elegido.
- Las contraseñas se guardan y comparan **en texto plano** (`useCases/login/login.ts`).
- `pruebas.http` no tiene requests de login, pedidos ni admin.

---

> 📝 _Este documento se va ampliando a medida que se definen nuevas tareas._
