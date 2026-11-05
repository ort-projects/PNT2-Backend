import type { PedidosDao, ProductosDao, UsuariosDao } from '../../types/daos.js'
import type { OrderInput } from '../../schemas/orderSchema.js'
import createOrder from './createOrder.js'
import getAll from './getAll.js'
import getOrdersByUsername from './getOrdersByUsername.js'

interface PedidosDependencies{
    pedidosDao: PedidosDao;
    usuariosDao: UsuariosDao;
    productosDao: ProductosDao;
}

export default function makePedidosUseCases(dependencies: PedidosDependencies) {
    return {
        createOrder: (username: string, data: OrderInput) => createOrder(username, data, dependencies.pedidosDao, dependencies.usuariosDao, dependencies.productosDao),
        getOrdersByUsername: (username: string) => getOrdersByUsername(username, dependencies.pedidosDao),
        getAllOrders: (username?: string) => getAll(dependencies.pedidosDao, username),
    }
}

export type PedidosUseCases = ReturnType<typeof makePedidosUseCases>
