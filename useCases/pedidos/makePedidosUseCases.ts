import type { PedidosDao } from '../../types/daos.ts'
import createOrder from './createOrder.js';
import getAll from './getAll.js';
import getOrdersByUsername from './getOrdersByUsername.js';

export default function makePedidosUseCases(dao: PedidosDao) {
    return {
        createOrder: (username: string, items: { productId: number; quantity: number }[]) => createOrder(username, items, dao),
        getOrdersByUsername: (username: string) => getOrdersByUsername(username, dao),
        getAllOrders: () => getAll(dao),
    }
}

export type PedidosUseCases = ReturnType<typeof makePedidosUseCases>
