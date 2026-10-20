export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Producto {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string;
    sku: string;
    weight: number;
    dimensions: { width: number; height: number; depth: number };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: { createdAt: string; updatedAt: string; barcode: string; qrCode: string };
    images: string[];
    thumbnail: string;
}

export interface ProductoEnCarrito {
    id: number;
    titulo: string;
    cantidad: number;
}

export interface Carrito {
    id: number;
    productos: ProductoEnCarrito[];
}

export type Rol = "admin" | "user";

export interface Usuario {
    username: string;
    name: string;
    surname: string;
    password: string;
    role: Rol;
}

export interface Venta {
    id: number;
    fecha: string;
    productos: { productoId: number; cantidad: number }[];
}
