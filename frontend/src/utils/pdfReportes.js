import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarReportePDF = ({ ventas, compras, inventario }) => {
  const doc = new jsPDF();

  const totalVentas = ventas.reduce(
    (total, venta) => total + Number(venta.total),
    0
  );

  const totalCompras = compras.reduce(
    (total, compra) => total + Number(compra.total),
    0
  );

  const utilidad = totalVentas - totalCompras;

  doc.setFontSize(18);
  doc.text('LiquorPro - Reporte General', 14, 18);

  doc.setFontSize(11);
  doc.text(`Fecha de emisión: ${new Date().toLocaleDateString('es-PE')}`, 14, 28);

  doc.setFontSize(13);
  doc.text(`Total vendido: S/ ${totalVentas.toFixed(2)}`, 14, 42);
  doc.text(`Total comprado: S/ ${totalCompras.toFixed(2)}`, 14, 50);
  doc.text(`Utilidad bruta: S/ ${utilidad.toFixed(2)}`, 14, 58);

  autoTable(doc, {
    startY: 70,
    head: [['Producto', 'Categoría', 'Stock', 'Stock mínimo', 'Estado']],
    body: inventario.map((producto) => [
      producto.nombre,
      producto.categoria?.nombre || '-',
      producto.stock,
      producto.stockMinimo,
      producto.stock <= producto.stockMinimo ? 'Stock bajo' : 'Disponible'
    ])
  });

  doc.save('reporte-liquorpro.pdf');
};