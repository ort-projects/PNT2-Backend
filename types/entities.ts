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
    title: string;
    thumbnail: string;
    price: number;
    quantity: number;
}

export interface Pedido {
    id: number;
    date: Date;
    total: number;
    user: {
        username: string;
        name: string;
        surname: string;
    };
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

export type NuevoUsuario = Pick<Usuario, "username" | "name" | "surname" | "password">;
export type UsuarioPublico = Pick<Usuario, "username" | "name" | "surname" | "role">;
