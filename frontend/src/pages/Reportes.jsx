import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../layouts/DashboardLayout';
import Loading from '../components/Loading';
import { generarReportePDF } from '../utils/pdfReportes';
import { generarReporteExcel } from '../utils/excelReportes';

import {
  obtenerReporteVentas,
  obtenerReporteCompras,
  obtenerReporteInventario
} from '../services/reporteService';

export default function Reportes() {
  const [loading, setLoading] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [compras, setCompras] = useState([]);
  const [inventario, setInventario] = useState([]);

  const cargarReportes = async () => {
    try {
      setLoading(true);

      const [ventasData, comprasData, inventarioData] = await Promise.all([
        obtenerReporteVentas(),
        obtenerReporteCompras(),
        obtenerReporteInventario()
      ]);

      setVentas(ventasData);
      setCompras(comprasData);
      setInventario(inventarioData);
    } catch (error) {
      toast.error('Error al cargar reportes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  const totalVentas = ventas.reduce((total, venta) => total + Number(venta.total), 0);
  const totalCompras = compras.reduce((total, compra) => total + Number(compra.total), 0);
  const utilidad = totalVentas - totalCompras;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
  <div>
    <h2 className="text-3xl font-bold text-slate-800">Reportes</h2>
    <p className="text-slate-500">
      Resumen de ventas, compras e inventario
    </p>
  </div>

  <div className="flex gap-3">

  <button
    onClick={() => generarReportePDF({ ventas, compras, inventario })}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold"
  >
    Exportar PDF
  </button>

  <button
    onClick={() => generarReporteExcel({ ventas, compras, inventario })}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
  >
    Exportar Excel
  </button>

</div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-700">Total vendido</h3>
          <p className="text-3xl font-bold text-green-600 mt-3">
            S/ {totalVentas.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-700">Total comprado</h3>
          <p className="text-3xl font-bold text-blue-600 mt-3">
            S/ {totalCompras.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-700">Utilidad bruta</h3>
          <p className="text-3xl font-bold text-purple-600 mt-3">
            S/ {utilidad.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-slate-200 p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Inventario actual
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">Producto</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Stock mínimo</th>
                <th className="px-4 py-3 text-center">Estado</th>
              </tr>
            </thead>

            <tbody>
              {inventario.map((producto) => (
                <tr key={producto.id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">{producto.nombre}</td>
                  <td className="px-4 py-3">{producto.categoria?.nombre || '-'}</td>
                  <td className="px-4 py-3 text-center">{producto.stock}</td>
                  <td className="px-4 py-3 text-center">{producto.stockMinimo}</td>
                  <td className="px-4 py-3 text-center">
                    {producto.stock <= producto.stockMinimo ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Stock bajo
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Disponible
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}