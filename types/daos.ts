import type { Producto, Usuario } from "./entities.js";

export interface ProductosDao {
    getProduct(id: number): Promise<Producto | undefined>;
    getProducts(): Promise<Producto[]>;
}

export interface UsuariosDao {
    getUser(id: number): Promise<Usuario | undefined>;
    getUsers(): Promise<Usuario[]>;
}
