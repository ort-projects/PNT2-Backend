import type { PrismaClient } from "../generated/prisma/client.js";
import type { ProductosDao as IProductosDao } from "../types/daos.js";
import type { ProductoPatch } from "../types/entities.js";

class ProductosDao implements IProductosDao {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient){
        this.prisma = prisma;
    }

    async getProduct(id: number){
        const producto = await this.prisma.producto.findUnique({ where: { id } });
        return producto ?? undefined;
    }
    async getProducts(){
        return this.prisma.producto.findMany();
    }

    async getProductsByIds(ids: number[]) {
        return this.prisma.producto.findMany({ where: { id: { in: ids } } });
    }

    async updateProduct(id: number, changes: ProductoPatch) {
        return this.prisma.producto.update({ where: { id }, data: changes });
    }
}

export default ProductosDao;
