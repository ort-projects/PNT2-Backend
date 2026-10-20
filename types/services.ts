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
    createToken(user: Usuario): string;
    verifyToken(token: string): TokenClaims | null;
}
