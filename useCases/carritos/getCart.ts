import AppError from "../../errors/AppError.js";
import type { CarritosDao } from "../../types/daos.js";

export default async function getCart(id: number, cartRepository: CarritosDao) {
    const carrito = await cartRepository.getCart(id);
    if(!carrito)
        throw new AppError("CART_NOT_FOUND", "No se encontro el carrito", 404)

    return carrito;
}
