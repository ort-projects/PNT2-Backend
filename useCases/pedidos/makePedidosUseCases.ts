import type { PedidosDao } from '../../types/daos.ts'
import type { OrderInput } from '../../schemas/orderSchema.js'
import createOrder from './createOrder.js';
import getAll from './getAll.js';
import getOrdersByUsername from './getOrdersByUsername.js';

export default function makePedidosUseCases(dao: PedidosDao) {
    return {
        createOrder: (username: string, data: OrderInput) => createOrder(username, data, dao),
        getOrdersByUsername: (username: string) => getOrdersByUsername(username, dao),
        getAllOrders: () => getAll(dao),
    }
}

export type PedidosUseCases = ReturnType<typeof makePedidosUseCases>
