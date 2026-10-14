export default class CarritosController{
    constructor(carritosUseCases){
        this.carritosUseCases = carritosUseCases;
    }

    async getCart(req, res) {
        const carrito = await this.carritosUseCases.getCart(Number(req.params.id));
        res.status(200).json(carrito);

    }

    async createCart(req, res) {
        
    }

}
