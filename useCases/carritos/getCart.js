import AppError from "../../errors/AppError.js";

export default async function getCart(id, cartRepository) {
    const carrito = await cartRepository.getCart(id);
    if(!carrito)
        throw new AppError("CART_NOT_FOUND", "No se encontro el carrito", 404)

    return carrito;
}
