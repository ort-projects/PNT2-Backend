class ProductosController{
    constructor(productosUseCases){
        this.productosUseCases = productosUseCases;
    }

    async getProducts(req, res){
        const products = await this.productosUseCases.getProducts(null);
        res.status(200).json(products);
    }

    async getProduct(req, res){
        const product = await this.productosUseCases.getProduct(Number(req.params.id));
        res.status(200).json(product);
    }
}

export default ProductosController;