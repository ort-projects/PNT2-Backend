import prisma from "../connection/prisma.js";

const productos = [
  {
    title: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    price: 9.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  },
  {
    title: "Eyeshadow Palette with Mirror",
    description:
      "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    category: "beauty",
    price: 19.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
  },
  {
    title: "Powder Canister",
    description:
      "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    category: "beauty",
    price: 14.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
  },
  {
    title: "Calvin Klein CK One",
    description:
      "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    category: "fragrances",
    price: 49.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
  },
  {
    title: "Chanel Coco Noir Eau De",
    description:
      "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    category: "fragrances",
    price: 129.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
  },
  {
    title: "Dior J'adore",
    description:
      "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    category: "fragrances",
    price: 89.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
  },
  {
    title: "Annibale Colombo Bed",
    description:
      "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    category: "furniture",
    price: 1899.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
  },
  {
    title: "Annibale Colombo Sofa",
    description:
      "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    category: "furniture",
    price: 2499.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
  },
  {
    title: "Apple",
    description:
      "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    category: "groceries",
    price: 1.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
  },
  {
    title: "Beef Steak",
    description:
      "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
    category: "groceries",
    price: 12.99,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
  },
];

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

    await prisma.producto.upsert({
      where: { id },
      update: producto,
      create: { id, ...producto },
    });
  }

  console.log(`Seed completo: ${productos.length} productos.`);

  for (const [index, usuario] of usuarios.entries()) {
      const id = index + 1;
    await prisma.usuario.upsert({
      
      where: { id },
      update: usuario,
      create: { id, ...usuario },
      
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
