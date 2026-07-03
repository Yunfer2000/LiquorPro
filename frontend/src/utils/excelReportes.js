import * as XLSX from 'xlsx';

const ajustarColumnas = (hoja, anchos) => {
  hoja['!cols'] = anchos.map((width) => ({ width }));
};

export const generarReporteExcel = ({ ventas, compras, inventario }) => {
  const totalVentas = ventas.reduce(
    (total, venta) => total + Number(venta.total),
    0
  );

  const totalCompras = compras.reduce(
    (total, compra) => total + Number(compra.total),
    0
  );

  const utilidad = totalVentas - totalCompras;

  const resumen = [
    ['Reporte General LiquorPro'],
    ['Fecha de emisión', new Date().toLocaleDateString('es-PE')],
    [],
    ['Total vendido', `S/ ${totalVentas.toFixed(2)}`],
    ['Total comprado', `S/ ${totalCompras.toFixed(2)}`],
    ['Utilidad bruta', `S/ ${utilidad.toFixed(2)}`]
  ];

  const hojaResumen = XLSX.utils.aoa_to_sheet(resumen);
  ajustarColumnas(hojaResumen, [28, 20]);

  const hojaInventario = XLSX.utils.json_to_sheet(
    inventario.map((producto) => ({
      Producto: producto.nombre,
      Categoría: producto.categoria?.nombre || '-',
      Stock: producto.stock,
      'Stock mínimo': producto.stockMinimo,
      Estado:
        producto.stock <= producto.stockMinimo
          ? 'Stock bajo'
          : 'Disponible'
    }))
  );
  ajustarColumnas(hojaInventario, [35, 20, 12, 18, 18]);

  const hojaVentas = XLSX.utils.json_to_sheet(
    ventas.map((venta) => ({
      Fecha: new Date(venta.fecha).toLocaleDateString('es-PE'),
      Cliente: venta.cliente
        ? `${venta.cliente.nombres} ${venta.cliente.apellidos}`
        : '-',
      Productos: venta.detalles?.length || 0,
      Total: `S/ ${Number(venta.total).toFixed(2)}`
    }))
  );
  ajustarColumnas(hojaVentas, [15, 40, 15, 18]);

  const hojaCompras = XLSX.utils.json_to_sheet(
    compras.map((compra) => ({
      Fecha: new Date(compra.fecha).toLocaleDateString('es-PE'),
      Proveedor: compra.proveedor?.nombre || '-',
      Productos: compra.detalles?.length || 0,
      Total: `S/ ${Number(compra.total).toFixed(2)}`
    }))
  );
  ajustarColumnas(hojaCompras, [15, 45, 15, 18]);

  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hojaResumen, 'Resumen');
  XLSX.utils.book_append_sheet(libro, hojaInventario, 'Inventario');
  XLSX.utils.book_append_sheet(libro, hojaVentas, 'Ventas');
  XLSX.utils.book_append_sheet(libro, hojaCompras, 'Compras');

  XLSX.writeFile(libro, 'reporte-liquorpro.xlsx');
};