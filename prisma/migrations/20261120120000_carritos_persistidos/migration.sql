CREATE TABLE "Carrito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Carrito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "Carrito_userId_key" ON "Carrito"("userId");

CREATE TABLE "CarritoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "CarritoItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carrito" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CarritoItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "productos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "CarritoItem_cartId_productId_key" ON "CarritoItem"("cartId", "productId");

CREATE TABLE "CarritoImport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cartId" INTEGER NOT NULL,
    "importId" TEXT NOT NULL,
    CONSTRAINT "CarritoImport_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carrito" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "CarritoImport_cartId_importId_key" ON "CarritoImport"("cartId", "importId");
