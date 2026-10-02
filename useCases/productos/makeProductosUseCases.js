import getProduct from "./getProduct.js";
import getProducts from "./getProducts.js";

function makeProductoUseCases(dao){
    return{
        getProduct: (id) => getProduct(id, dao),
        getProducts: (filter) => getProducts(filter, dao)
    };
}

export default makeProductoUseCases;