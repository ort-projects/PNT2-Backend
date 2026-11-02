import type { PrismaClient } from "../generated/prisma/client.js";
import type { UsuariosDao as IUsuariosDao } from "../types/daos.js";

const usuarioPublicoSelect = {
    id: true,
    username: true,
    name: true,
    surname: true,
    role: true,
} as const;

class UsuariosDao implements IUsuariosDao {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient){
        this.prisma = prisma;
    }

    async getUser(id: number){
        const user = await this.prisma.usuario.findUnique({
            where: { id },
            select: usuarioPublicoSelect,
        });
        return user ?? undefined;
    }
    async getUserByUsername(username: string){
        const user = await this.prisma.usuario.findUnique({
            where: { username },
            select: usuarioPublicoSelect,
        });
        return user ?? undefined;
    }
    async getUserCredentialsByUsername(username: string){
        const user = await this.prisma.usuario.findUnique({ where: { username } });
        return user ?? undefined;
    }
    async getUsers(){
        return this.prisma.usuario.findMany({ select: usuarioPublicoSelect });
    }

    async createUser(data: Omit<import('../types/entities.js').Usuario, 'id' | 'role'>){
        return this.prisma.usuario.create({
            data: { ...data, role: 'user' },
            select: usuarioPublicoSelect,
        });
    }
}

export default UsuariosDao;
