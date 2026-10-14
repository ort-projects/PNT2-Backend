const carritos = [
    {id:1, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:2, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:3, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:4, productos:[{id:1, titulo: "prueba", cantidad:5}]},
    {id:5, productos:[{id:1, titulo: "prueba", cantidad:5}]}
];

class CarritosDao {
    async getCart(id) {
        return carritos.find(carrito => carrito.id == id);
    }
}

export const carritosDao = new CarritosDao();
