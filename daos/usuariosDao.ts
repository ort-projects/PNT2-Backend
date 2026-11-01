import type { PrismaClient } from "../generated/prisma/client.js";
import type { UsuariosDao as IUsuariosDao } from "../types/daos.js";
import type { NuevoUsuario, UsuarioPublico } from "../types/entities.js";

class UsuariosDao implements IUsuariosDao {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getUser(id: number) {
        const user = await this.prisma.usuario.findUnique({ where: { id } });
        return user ?? undefined;
    }

    async getUserByUsername(username: string) {
        const user = await this.prisma.usuario.findUnique({ where: { username } });
        return user ?? undefined;
    }

    async getUsers() {
        return this.prisma.usuario.findMany();
    }

    async createUser(data: NuevoUsuario): Promise<UsuarioPublico> {
        return this.prisma.usuario.create({
            data: { ...data, role: "user" },
            select: {
                username: true,
                name: true,
                surname: true,
                role: true,
            },
        });
    }
}

export default UsuariosDao;
