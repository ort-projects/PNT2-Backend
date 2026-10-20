import type { Carrito } from "../types/entities.js";
import type { CarritosDao as ICarritosDao } from "../types/daos.js";

const carritos: Carrito[] = [
    {id:1, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:2, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:3, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:4, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:5, productos:[{id:1, titulo: "prueba", cantidad:5}]}
];

class CarritosDao implements ICarritosDao {
    async getCart(id: number) {
        return carritos.find(carrito => carrito.id == id);
    }
}

export const carritosDao = new CarritosDao();
