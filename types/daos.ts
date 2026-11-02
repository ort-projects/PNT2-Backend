import type { Pedido, PedidoItem } from "../generated/prisma/client.js";
import type { PedidoConDetalle } from "../daos/queries/pedidoConDetalle.js";
import type { Producto, Usuario } from "./entities.js";

export interface ProductosDao {
    getProduct(id: number): Promise<Producto | undefined>;
    getProducts(): Promise<Producto[]>;
    getProductsByIds(ids: number[]): Promise<Producto[]>;
}

export interface UsuariosDao {
    getUser(id: number): Promise<Usuario | undefined>;
    getUserByUsername(username: string) : Promise<Usuario | undefined>;
    getUsers(): Promise<Usuario[]>;
}

export interface NuevoPedido {
    userId: number;
    items: Pick<PedidoItem, 'productId' | 'price' | 'quantity'>[];
}

export interface PedidosDao {
    save(data: NuevoPedido): Promise<Pedido>;
    getOrdersByUsername(username: string): Promise<PedidoConDetalle[]>;
    getAllOrders(): Promise<PedidoConDetalle[]>;
}
