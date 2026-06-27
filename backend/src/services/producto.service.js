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

const obtenerProductoPorId = async (id) => {
  const producto = await prisma.producto.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      categoria: true
    }
  });

  if (!producto || !producto.estado) {
    throw new Error('Producto no encontrado');
  }

  return producto;
};

const actualizarProducto = async (id, datos) => {
  await obtenerProductoPorId(id);

  if (datos.categoriaId) {
    const categoria = await prisma.categoria.findUnique({
      where: {
        id: datos.categoriaId
      }
    });

    if (!categoria) {
      throw new Error('La categoría no existe');
    }
  }

  return await prisma.producto.update({
    where: {
      id: Number(id)
    },
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

const eliminarProducto = async (id) => {
  await obtenerProductoPorId(id);

  return await prisma.producto.update({
    where: {
      id: Number(id)
    },
    data: {
      estado: false
    }
  });
};

module.exports = {
  listarCategorias,
  crearProducto,
  listarProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
};