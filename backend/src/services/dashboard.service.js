const prisma = require('../config/prisma');

const obtenerResumen = async () => {
  const [
    totalProductos,
    totalClientes,
    totalProveedores,
    productosStockBajo,
    totalVentas,
    totalCompras,
    ventas,
    compras
  ] = await Promise.all([
    prisma.producto.count({ where: { estado: true } }),
    prisma.cliente.count({ where: { estado: true } }),
    prisma.proveedor.count({ where: { estado: true } }),
    prisma.producto.count({
      where: {
        estado: true,
        stock: {
          lte: prisma.producto.fields.stockMinimo
        }
      }
    }),
    prisma.venta.count({ where: { estado: true } }),
    prisma.compra.count({ where: { estado: true } }),
    prisma.venta.findMany({
      where: { estado: true },
      select: { total: true }
    }),
    prisma.compra.findMany({
      where: { estado: true },
      select: { total: true }
    })
  ]);

  const montoVentas = ventas.reduce((sum, venta) => {
    return sum + Number(venta.total);
  }, 0);

  const montoCompras = compras.reduce((sum, compra) => {
    return sum + Number(compra.total);
  }, 0);

  return {
    totalProductos,
    totalClientes,
    totalProveedores,
    productosStockBajo,
    totalVentas,
    totalCompras,
    montoVentas,
    montoCompras
  };
};

module.exports = {
  obtenerResumen
};