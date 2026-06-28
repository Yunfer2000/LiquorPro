const prisma = require('../config/prisma');

const reporteVentas = async () => {
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

const reporteCompras = async () => {
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

const reporteInventario = async () => {
  return await prisma.producto.findMany({
    where: {
      estado: true
    },
    include: {
      categoria: true
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

module.exports = {
  reporteVentas,
  reporteCompras,
  reporteInventario
};