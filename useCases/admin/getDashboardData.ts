import type { PedidosDao, ProductosDao } from '../../types/daos.js'

export default async function getDashboardData(
    selectedYear: unknown,
    { pedidosDao, productosDao }: { pedidosDao: PedidosDao; productosDao: ProductosDao },
) {
    const currentYear = new Date().getFullYear()
    const parsedYear = Number(selectedYear)
    const year = Number.isInteger(parsedYear) && parsedYear >= 2000 && parsedYear <= currentYear
        ? parsedYear
        : currentYear

    const [orders, products] = await Promise.all([
        pedidosDao.getAllOrders(),
        productosDao.getProducts(),
    ])

    const ventas = orders
        .filter((order) => order.date.getUTCFullYear() === year)
        .map((order) => ({
            id: order.id,
            fecha: order.date.toISOString().slice(0, 10),
            productos: order.items.map((item) => ({
                productoId: item.productId,
                nombre: item.product.title,
                cantidad: item.quantity,
                precio: item.price,
            })),
        }))

    return {
        anio: year,
        ventas,
        productos: products.map(({ id, title, category, price, thumbnail, destacado }) => ({
            id,
            nombre: title,
            categoria: category,
            precio: price,
            imagen: thumbnail,
            destacado,
        })),
    }
}
