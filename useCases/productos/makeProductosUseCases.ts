import getProduct from "./getProduct.js";
import getProducts from "./getProducts.js";
import type { ProductosDao } from "../../types/daos.js";

export default function makeProductosUseCases(dao: ProductosDao){
    return{
        getProduct: (id: number) => getProduct(id, dao),
        getProducts: (filter: unknown) => getProducts(filter, dao)
    };
}

export type ProductosUseCases = ReturnType<typeof makeProductosUseCases>;
