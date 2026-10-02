import AppError from "../../errors/AppError.js";

async function getProduct(id, dao) {
    const product = await dao.getProduct(id);
    if(!product)
        throw new AppError("PRODUCT_NOT_FOUND", "No se encontro el producto", 404)
        
    return product;
}

export default getProduct;