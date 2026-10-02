import AppError from "../../errors/AppError.js";

const carritos = [
    {id:1, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:2, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:3, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:4, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:5, productos:[{id:1, titulo: "prueba", cantidad:5}]}
];

async function getCart(id) {
    const carrito = carritos.find(x => x.id == id)
    if(!carrito)
        throw new AppError("CART_NOT_FOUND", "No se encontro el carrito", 404)
        
    return carrito;
}

export default getCart;