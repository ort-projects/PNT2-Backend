import type { CarritoDao, CartData, ProductosDao, UsuariosDao } from '../../types/daos.js'
import type { CartImportInput, CartSaveInput } from '../../schemas/cartSchema.js'
import AppError from '../../errors/AppError.js'

export default function makeCarritoUseCases(
    carritoDao: CarritoDao,
    usuariosDao: UsuariosDao,
    productosDao: ProductosDao,
) {
    async function getUserId(username: string): Promise<number> {
        const user = await usuariosDao.getUserByUsername(username)
        if (!user) throw new AppError('USUARIO_NO_ENCONTRADO', 'No se encontró el usuario autenticado.', 404)
        return user.id
    }

    async function validateProducts(items: CartData['items']) {
        const products = await productosDao.getProductsByIds(items.map((item) => item.productId))
        const found = new Set(products.map((product) => product.id))
        const missing = items.filter((item) => !found.has(item.productId)).map((item) => item.productId)
        if (missing.length) {
            throw new AppError('PRODUCTOS_NO_ENCONTRADOS', 'Algunos productos del carrito ya no existen.', 404, missing)
        }
    }

    return {
        get: async (username: string) => carritoDao.get(await getUserId(username)),

        save: async (username: string, data: CartSaveInput) => {
            const userId = await getUserId(username)
            await validateProducts(data.items)
            const cart = await carritoDao.save(userId, data.version, data.items)
            if (!cart) throw new AppError('CARRITO_VERSION_DESACTUALIZADA', 'El carrito fue actualizado en otra sesión.', 409)
            return cart
        },

        import: async (username: string, data: CartImportInput) => {
            const userId = await getUserId(username)
            await validateProducts(data.items)
            return carritoDao.import(userId, data.importId, data.items)
        },
    }
}

export type CarritoUseCases = ReturnType<typeof makeCarritoUseCases>
