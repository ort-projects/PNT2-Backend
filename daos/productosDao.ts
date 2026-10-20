import type { PrismaClient } from "../generated/prisma/client.js";
import type { ProductosDao as IProductosDao } from "../types/daos.js";

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
}

export default ProductosDao;
