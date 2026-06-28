const prisma = require('../config/prisma');

const listarClientes = async () => {
  return await prisma.cliente.findMany({
    where: {
      estado: true
    },
    orderBy: {
      apellidos: 'asc'
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

const crearVenta = async (datos) => {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: datos.clienteId
    }
  });

  if (!cliente || !cliente.estado) {
    throw new Error('Cliente no encontrado');
  }

  if (!datos.detalles || datos.detalles.length === 0) {
    throw new Error('La venta debe tener al menos un producto');
  }

  let total = 0;

  for (const item of datos.detalles) {
    const producto = await prisma.producto.findUnique({
      where: {
        id: item.productoId
      }
    });

    if (!producto || !producto.estado) {
      throw new Error(`Producto ${item.productoId} no encontrado`);
    }

    if (producto.stock < item.cantidad) {
      throw new Error(
        `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}`
      );
    }

    total += item.cantidad * item.precioUnitario;
  }

  return await prisma.$transaction(async (tx) => {
    const venta = await tx.venta.create({
      data: {
        clienteId: datos.clienteId,
        total,
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
        cliente: true,
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
            decrement: item.cantidad
          }
        }
      });
    }

    return venta;
  });
};

const listarVentas = async () => {
  return await prisma.venta.findMany({
    where: {
      estado: true
    },
    include: {
      cliente: true,
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

const obtenerVentaPorId = async (id) => {
  const venta = await prisma.venta.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      cliente: true,
      detalles: {
        include: {
          producto: true
        }
      }
    }
  });

  if (!venta || !venta.estado) {
    throw new Error('Venta no encontrada');
  }

  return venta;
};

module.exports = {
  listarClientes,
  listarProductos,
  crearVenta,
  listarVentas,
  obtenerVentaPorId
};