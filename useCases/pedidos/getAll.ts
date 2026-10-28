import type { PedidosDao } from "../../types/daos.ts";

export default async function getAll(dao: PedidosDao){
    return await dao.getAllOrders();
}