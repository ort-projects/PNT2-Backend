import { productos } from "../data/productsData.js";

class ProductosDao {
    async getProduct(id){
        return productos.find(x => x.id == id);
    }
    async getProducts(){
        return productos;
    }
}

export const productosDao = new ProductosDao();