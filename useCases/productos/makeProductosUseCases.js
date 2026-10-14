import getProduct from "./getProduct.js";
import getProducts from "./getProducts.js";

export default function makeProductosUseCases(dao){
    return{
        getProduct: (id) => getProduct(id, dao),
        getProducts: (filter) => getProducts(filter, dao)
    };
}
