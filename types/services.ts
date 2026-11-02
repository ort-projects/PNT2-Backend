import type { Rol, Usuario } from "./entities.js";

export interface TokenClaims {
    sub: string;
    role: Rol;
    name: string;
    surname: string;
    iat: number;
    exp: number;
}

export interface TokenService {
    createToken(user: Pick<Usuario, 'username' | 'role' | 'name' | 'surname'>): string;
    verifyToken(token: string): TokenClaims | null;
}

export interface PasswordHasher {
    hash(plain: string): Promise<string>;
    compare(plain: string, hash: string): Promise<boolean>;
}
