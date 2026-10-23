import type { PrismaClient } from "../generated/prisma/client.js";
import type { UsuariosDao as IUsuariosDao } from "../types/daos.js";

class UsuariosDao implements IUsuariosDao {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient){
        this.prisma = prisma;
    }

    async getUser(id: number){
        const User = await this.prisma.usuario.findUnique({ where: { id } });
        return User ?? undefined;
    }
    async getUsers(){
        return this.prisma.usuario.findMany();
    }
}

export default UsuariosDao;
