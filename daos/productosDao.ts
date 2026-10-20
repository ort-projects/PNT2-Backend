import { productos } from "../data/productsData.js";
import type { ProductosDao as IProductosDao } from "../types/daos.js";

class ProductosDao implements IProductosDao {
    async getProduct(id: number){
        return productos.find(x => x.id == id);
    }
    async getProducts(){
        return productos;
    }
}

export const productosDao = new ProductosDao();
