import AppError from "../../errors/AppError.js";
import type { ProductosDao } from "../../types/daos.js";

async function getProduct(id: number, dao: ProductosDao) {
    const product = await dao.getProduct(id);
    if(!product)
        throw new AppError("PRODUCT_NOT_FOUND", "No se encontro el producto", 404)
        
    return product;
}

export default getProduct;
