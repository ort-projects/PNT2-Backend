import type { ProductosDao } from "../../types/daos.js";

async function getProducts(filter: unknown, dao: ProductosDao) {
    return dao.getProducts();
}

export default getProducts;
