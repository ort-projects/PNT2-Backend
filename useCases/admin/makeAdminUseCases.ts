import getDashboardData from "./getDashboardData.js";
import type { PedidosDao, ProductosDao } from '../../types/daos.js'
import type { ProductoPatch } from '../../types/entities.js'

export default function makeAdminUseCases(dependencies: { pedidosDao: PedidosDao; productosDao: ProductosDao }) {
    return {
        getDashboardData: (selectedYear: unknown) => getDashboardData(selectedYear, dependencies),
        updateProduct: (id: number, changes: ProductoPatch) => dependencies.productosDao.updateProduct(id, changes),
    };
}

export type AdminUseCases = ReturnType<typeof makeAdminUseCases>;
