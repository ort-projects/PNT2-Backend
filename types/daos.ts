import type { Producto, Usuario } from "./entities.js";

export interface ProductosDao {
    getProduct(id: number): Promise<Producto | undefined>;
    getProducts(): Promise<Producto[]>;
}

export interface UsuariosDao {
    getUser(username: string): Promise<Usuario | undefined>;
}
