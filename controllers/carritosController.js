import getCart from "../useCases/carritos/getCart.js";

class CarritosController{
    constructor(){

    }

    async getCart(req, res) {
        const carrito = await getCart(Number(req.params.id));
        res.status(200).json(carrito);

    }

    async createCart(req, res) {
        
    }

}

export default CarritosController;