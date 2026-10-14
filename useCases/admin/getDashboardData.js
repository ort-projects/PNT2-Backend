const dashData = (anioSeleccionado) => [
  { id: 1, fecha: `${anioSeleccionado}-01-12`, productos: [{ productoId: 1, cantidad: 2 }, { productoId: 2, cantidad: 1 }] },
  { id: 2, fecha: `${anioSeleccionado}-01-26`, productos: [{ productoId: 3, cantidad: 1 }] },
  { id: 3, fecha: `${anioSeleccionado}-02-08`, productos: [{ productoId: 1, cantidad: 1 }] },
  { id: 4, fecha: `${anioSeleccionado}-02-19`, productos: [{ productoId: 2, cantidad: 3 }] },
  { id: 5, fecha: `${anioSeleccionado}-03-05`, productos: [{ productoId: 3, cantidad: 2 }] },
  { id: 6, fecha: `${anioSeleccionado}-03-21`, productos: [{ productoId: 1, cantidad: 1 }, { productoId: 2, cantidad: 1 }] },
  { id: 7, fecha: `${anioSeleccionado}-04-10`, productos: [{ productoId: 2, cantidad: 2 }] },
  { id: 8, fecha: `${anioSeleccionado}-05-03`, productos: [{ productoId: 1, cantidad: 1 }] },
  { id: 9, fecha: `${anioSeleccionado}-05-18`, productos: [{ productoId: 3, cantidad: 2 }] },
  { id: 10, fecha: `${anioSeleccionado}-06-14`, productos: [{ productoId: 1, cantidad: 2 }] },
  { id: 11, fecha: `${anioSeleccionado}-07-09`, productos: [{ productoId: 2, cantidad: 1 }] },
  { id: 12, fecha: `${anioSeleccionado}-08-22`, productos: [{ productoId: 3, cantidad: 3 }] },
];

export default async function getDashboardData(anioSeleccionado){
    return dashData(anioSeleccionado);
}
