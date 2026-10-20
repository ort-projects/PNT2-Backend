export interface Producto {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
}

export type Rol = "admin" | "user";

export interface Usuario {
    username: string;
    name: string;
    surname: string;
    password: string;
    role: Rol;
}
