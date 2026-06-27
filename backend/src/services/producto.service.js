const prisma = require('../config/prisma');

const listarCategorias = async () => {
  return await prisma.categoria.findMany({
    where: {
      estado: true
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

const crearProducto = async (datos) => {
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: datos.categoriaId
    }
  });

  if (!categoria) {
    throw new Error('La categoría no existe');
  }

  return await prisma.producto.create({
    data: {
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      marca: datos.marca,
      precioCompra: datos.precioCompra,
      precioVenta: datos.precioVenta,
      stock: datos.stock,
      stockMinimo: datos.stockMinimo,
      categoriaId: datos.categoriaId
    }
  });
};

const listarProductos = async () => {
  return await prisma.producto.findMany({
    where: {
      estado: true
    },
    include: {
      categoria: true
    },
    orderBy: {
      creadoEn: 'desc'
    }
  });
};

module.exports = {
  listarCategorias,
  crearProducto,
  listarProductos
};