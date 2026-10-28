export interface Producto {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
}

export interface PedidoItem {
    productId: number;
    price: number;
    quantity: number;
}

export interface Pedido {
    id: number;
    date: Date;
    user: string;
    items: PedidoItem[];
}

export type Rol = "admin" | "user";

export interface Usuario {
    username: string;
    name: string;
    surname: string;
    password: string;
    role: Rol;
}
