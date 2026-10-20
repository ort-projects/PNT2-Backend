import type { Carrito, Producto, Usuario } from "./entities.js";

export interface ProductosDao {
    getProduct(id: number): Promise<Producto | undefined>;
    getProducts(): Promise<Producto[]>;
}

export interface CarritosDao {
    getCart(id: number): Promise<Carrito | undefined>;
}

export interface UsuariosDao {
    getUser(username: string): Promise<Usuario | undefined>;
}
