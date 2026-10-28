import type { Producto, Usuario } from "./entities.ts";

export interface ProductosDao {
    getProduct(id: number): Promise<Producto | undefined>;
    getProducts(): Promise<Producto[]>;
}

export interface UsuariosDao {
    getUser(id: number): Promise<Usuario | undefined>;
    getUserByUsername(username: string) : Promise<Usuario | undefined>;
    getUsers(): Promise<Usuario[]>;
}

export interface PedidosDao {
    createOrder(username: string, items: { productId: number; quantity: number }[]): Promise<unknown>;
    getOrdersByUsername(username: string): Promise<unknown[]>;
    getAllOrders(): Promise<unknown[]>;
}
