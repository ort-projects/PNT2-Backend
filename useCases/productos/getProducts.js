import AppError from "../../errors/AppError.js";

async function getProducts(filter, dao) {
    return dao.getProducts();
}

export default getProducts;