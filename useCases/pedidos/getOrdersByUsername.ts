import type { PedidosDao } from '../../types/daos.ts';

export default async function getOrdersByUsername(username: string, dao: PedidosDao){
    return await dao.getOrdersByUsername(username);
}