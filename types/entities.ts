export interface Producto {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
    destacado: boolean;
}

export type ProductoPatch = Partial<Pick<Producto, 'title' | 'description' | 'category' | 'price' | 'thumbnail' | 'destacado'>>;

export interface PedidoItem {
    productId: number;
    title: string;
    thumbnail: string;
    price: number;
    quantity: number;
}

export type EstadoPedido = "pendiente" | "enviado" | "entregado" | "cancelado";

export interface Pedido {
    id: number;
    date: Date;
    status: EstadoPedido;
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
    id: number;
    username: string;
    name: string;
    surname: string;
    password: string;
    role: Rol;
}

export type UsuarioPublico = Omit<Usuario, 'password'>;
