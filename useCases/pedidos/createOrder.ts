import type { PedidosDao, ProductosDao, UsuariosDao } from '../../types/daos.js'
import AppError from '../../errors/AppError.js'
import type { OrderInput } from '../../schemas/orderSchema.js'
import type { Pedido } from '../../types/entities.js'
import toPedido from './toPedido.js'

export default async function createOrder(
    username: string,
    data: OrderInput,
    pedidosDao: PedidosDao,
    usuariosDao: UsuariosDao,
    productosDao: ProductosDao
): Promise<Pedido> {
    const usuario = await usuariosDao.getUserByUsername(username)
    if (!usuario) {
        throw new AppError('USUARIO_NO_ENCONTRADO', 'No se encontró el usuario autenticado.', 404)
    }

    const ids = [...new Set(data.items.map((item) => item.productId))]
    const productos = await productosDao.getProductsByIds(ids)
    const porId = new Map(productos.map((producto) => [producto.id, producto]))

    const items = data.items.map(({ productId, quantity }) => {
        const producto = porId.get(productId)
        if (!producto) {
            throw new AppError('PRODUCTO_NO_ENCONTRADO', `No existe el producto ${productId}.`, 404)
        }

        return { productId, quantity, price: producto.price, product: producto }
    })

    const pedido = await pedidosDao.save({
        userId: usuario.id,
        items: items.map(({ productId, quantity, price }) => ({ productId, quantity, price })),
    })

    return toPedido({ ...pedido, user: usuario, items })
}
