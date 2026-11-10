import prisma from "../connection/prisma.js";
import createPasswordHasher from "../adapters/security/passwordHasher.js";
import { BCRYPT_ROUNDS } from "../config/config.js"

const passwordHasher = createPasswordHasher({ rounds: BCRYPT_ROUNDS });

const productos = [
  {
    title: "Camisa a cuadros azul y negra",
    description:
      "Camisa de algodón a cuadros en tonos azul y negro, de corte regular y manga larga. Ideal para un look casual de todos los días.",
    category: "camisas",
    price: 29.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
  },
  {
    title: "Camisa leñadora",
    description:
      "Camisa leñadora de franela suave, abrigada y cómoda. Combina perfecto con jeans y zapatillas para los días frescos.",
    category: "camisas",
    price: 34.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp",
  },
  {
    title: "Camisa de manga corta",
    description:
      "Camisa liviana de manga corta, fresca y fácil de combinar. Pensada para el verano y salidas informales.",
    category: "camisas",
    price: 19.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp",
  },
  {
    title: "Vestido largo negro",
    description:
      "Vestido largo negro de silueta entallada y caída elegante. Una opción clásica para fiestas y eventos de noche.",
    category: "vestidos",
    price: 129.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp",
  },
  {
    title: "Vestido verde estampado",
    description:
      "Vestido estampado en tono verde, de tela liviana y largo midi. Fresco, cómodo y femenino para el día.",
    category: "vestidos",
    price: 49.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/thumbnail.webp",
  },
  {
    title: "Vestido azul corto",
    description:
      "Vestido corto azul de corte suelto, ideal para el verano. Fácil de llevar con sandalias o zapatillas.",
    category: "vestidos",
    price: 29.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/tops/blue-frock/thumbnail.webp",
  },
  {
    title: "Vestido gris",
    description:
      "Vestido gris de líneas simples y tela suave. Un básico versátil que se adapta tanto a la oficina como a una salida.",
    category: "vestidos",
    price: 34.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/tops/gray-dress/thumbnail.webp",
  },
  {
    title: "Zapatillas urbanas retro",
    description:
      "Zapatillas de estilo retro con capellada combinada y suela de goma. Comodidad y onda urbana para todo el día.",
    category: "calzado",
    price: 89.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp",
  },
  {
    title: "Zapatillas blancas y rojas",
    description:
      "Zapatillas deportivas en blanco con detalles en rojo, livianas y con buena amortiguación. Perfectas para entrenar o pasear.",
    category: "calzado",
    price: 119.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/thumbnail.webp",
  },
  {
    title: "Zapatos de taco",
    description:
      "Zapatos de taco alto con punta fina y terminación brillante. El complemento ideal para un look formal.",
    category: "calzado",
    price: 79.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/thumbnail.webp",
  },
  {
    title: "Zapatos dorados",
    description:
      "Zapatos dorados de diseño llamativo, cómodos y fáciles de combinar con vestidos de fiesta.",
    category: "calzado",
    price: 49.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/thumbnail.webp",
  },
  {
    title: "Cartera azul",
    description:
      "Cartera de mano color azul con cierre y manijas firmes. Espaciosa y práctica para el día a día.",
    category: "carteras",
    price: 49.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/thumbnail.webp",
  },
  {
    title: "Bolso de cuero",
    description:
      "Bolso de cuero de gran capacidad, con compartimentos internos y correa ajustable. Elegante y resistente.",
    category: "carteras",
    price: 129.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/thumbnail.webp",
  },
  {
    title: "Mochila de cuero sintético blanca",
    description:
      "Mochila de cuero sintético blanca, compacta y liviana. Ideal para la ciudad, con estilo minimalista.",
    category: "carteras",
    price: 39.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/thumbnail.webp",
  },
  {
    title: "Anteojos de sol negros",
    description:
      "Anteojos de sol con marco negro y lentes oscuras con protección UV. Un clásico que nunca pasa de moda.",
    category: "anteojos",
    price: 29.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp",
  },
  {
    title: "Anteojos de sol clásicos",
    description:
      "Anteojos de sol de diseño clásico, livianos y cómodos. Protegen del sol con mucho estilo.",
    category: "anteojos",
    price: 24.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/thumbnail.webp",
  },
  {
    title: "Aros de cristal verde",
    description:
      "Aros con cristales verdes que aportan brillo y color. Perfectos para destacar un look de noche.",
    category: "accesorios",
    price: 29.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/thumbnail.webp",
  },
  {
    title: "Reloj con malla de cuero marrón",
    description:
      "Reloj analógico con malla de cuero marrón y esfera clásica. Un accesorio elegante para uso diario.",
    category: "accesorios",
    price: 89.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp",
  },
];

// Productos con mayor movimiento en el año actual; los de menor venta quedan sin destacar
// para que sigan apareciendo como candidatos de promoción en el dashboard.
const idsProductosDestacados = new Set([2, 3, 6, 9, 11, 12, 14, 15, 17, 18]);

const usuarios = [
  {
    username: "gonzalo@cabo.com",
    name: "Gonzalo",
    surname: "Cabo",
    password: "12345678",
    role: "admin",
  },
  {
    username: "dana@mehle.com",
    name: "Dana",
    surname: "Mehle",
    password: "12345678",
    role: "admin",
  },
  {
    username: "gabriel@teruel.com",
    name: "Gabriel",
    surname: "Teruel",
    password: "12345678",
    role: "user",
  },
] as const;

const CANTIDAD_VENTAS_SEED = 1000;

async function seedVentas() {
  const ventasExistentes = await prisma.pedido.count();
  if (ventasExistentes > 0) {
    console.log(`Seed de ventas omitido: ya existen ${ventasExistentes} ventas.`);
    return;
  }

  const fechaFin = new Date();
  const fechaInicio = new Date(fechaFin.getTime() - 1000 * 24 * 60 * 60 * 1000);
  const intervalo = (fechaFin.getTime() - fechaInicio.getTime()) / (CANTIDAD_VENTAS_SEED - 1);
  const ventas = Array.from({ length: CANTIDAD_VENTAS_SEED }, (_, index) => {
    const cantidadItems = 1 + (index % 3);
    const items = Array.from({ length: cantidadItems }, (_, itemIndex) => {
      const productoIndex = (index * 7 + itemIndex * 3) % productos.length;
      const producto = productos[productoIndex];

      return {
        productId: productoIndex + 1,
        price: producto.price,
        quantity: 1 + ((index + itemIndex * 5) % 5),
      };
    });

    return {
      date: new Date(fechaInicio.getTime() + Math.round(intervalo * index)),
      userId: (index % usuarios.length) + 1,
      items,
    };
  });

  await prisma.$transaction(async (tx) => {
    await tx.pedido.createMany({
      data: ventas.map(({ date, userId }) => ({ date, userId })),
    });

    const pedidosCreados = await tx.pedido.findMany({
      where: { date: { gte: fechaInicio, lte: fechaFin } },
      orderBy: { date: "asc" },
      select: { id: true },
    });

    await tx.pedidoItem.createMany({
      data: pedidosCreados.flatMap((pedido, index) =>
        ventas[index].items.map((item) => ({ ...item, orderId: pedido.id })),
      ),
    });
  });

  console.log(`Seed completo: ${CANTIDAD_VENTAS_SEED} ventas con fechas distribuidas en los últimos 1000 días.`);
}

async function main() {
  for (const [index, producto] of productos.entries()) {
    const id = index + 1;
    const productoConDestacado = {
      ...producto,
      destacado: idsProductosDestacados.has(id),
    };

    await prisma.producto.upsert({
      where: { id },
      update: productoConDestacado,
      create: { id, ...productoConDestacado },
    });
  }

  console.log(`Seed completo: ${productos.length} productos.`);

  for (const [index, usuario] of usuarios.entries()) {
      const id = index + 1;
    const usuarioConPasswordHasheada = {
      ...usuario,
      password: await passwordHasher.hash(usuario.password),
    };
    await prisma.usuario.upsert({
      
      where: { id },
      update: usuarioConPasswordHasheada,
      create: { id, ...usuarioConPasswordHasheada },
      
    });
  }

  console.log(`Seed completo: ${usuarios.length} usuarios.`);

  await seedVentas();
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
