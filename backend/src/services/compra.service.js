const prisma = require('../config/prisma');

const listarProveedores = async () => {
  return await prisma.proveedor.findMany({
    where: {
      estado: true
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

const listarProductos = async () => {
  return await prisma.producto.findMany({
    where: {
      estado: true
    },
    orderBy: {
      nombre: 'asc'
    },
    include: {
      categoria: true
    }
  });
};

const crearCompra = async (datos) => {
  const proveedor = await prisma.proveedor.findUnique({
    where: {
      id: datos.proveedorId
    }
  });

  if (!proveedor || !proveedor.estado) {
    throw new Error('Proveedor no encontrado');
  }

  if (!datos.detalles || datos.detalles.length === 0) {
    throw new Error('La compra debe tener al menos un producto');
  }

  const total = datos.detalles.reduce((acumulado, item) => {
    return acumulado + item.cantidad * item.precioUnitario;
  }, 0);

  return await prisma.$transaction(async (tx) => {
    const compra = await tx.compra.create({
      data: {
        proveedorId: datos.proveedorId,
        total: total,
        detalles: {
          create: datos.detalles.map((item) => ({
            productoId: item.productoId,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            subtotal: item.cantidad * item.precioUnitario
          }))
        }
      },
      include: {
        proveedor: true,
        detalles: {
          include: {
            producto: true
          }
        }
      }
    });

    for (const item of datos.detalles) {
      await tx.producto.update({
        where: {
          id: item.productoId
        },
        data: {
          stock: {
            increment: item.cantidad
          }
        }
      });
    }

    return compra;
  });
};

const listarCompras = async () => {
  return await prisma.compra.findMany({
    where: {
      estado: true
    },
    include: {
      proveedor: true,
      detalles: {
        include: {
          producto: true
        }
      }
    },
    orderBy: {
      fecha: 'desc'
    }
  });
};

const obtenerCompraPorId = async (id) => {
  const compra = await prisma.compra.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      proveedor: true,
      detalles: {
        include: {
          producto: true
        }
      }
    }
  });

  if (!compra || !compra.estado) {
    throw new Error('Compra no encontrada');
  }

  return compra;
};

module.exports = {
  listarProveedores,
  listarProductos,
  crearCompra,
  listarCompras,
  obtenerCompraPorId
};