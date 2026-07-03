import { useEffect, useState } from 'react';
import {
  FaBoxOpen,
  FaUsers,
  FaTruck,
  FaShoppingCart,
  FaCashRegister,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaChartLine
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import Loading from '../components/Loading';

export default function Dashboard() {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarResumen = async () => {
      try {
        const response = await api.get('/dashboard/resumen');
        setResumen(response.data.data);
      } catch (error) {
        console.error('Error al cargar dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarResumen();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  const montoVentas = Number(resumen?.montoVentas ?? 0);
  const montoCompras = Number(resumen?.montoCompras ?? 0);
  const utilidad = montoVentas - montoCompras;
  const datosGrafico = [
  {
    nombre: 'Ventas',
    monto: montoVentas
  },
  {
    nombre: 'Compras',
    monto: montoCompras
  },
  {
    nombre: 'Utilidad',
    monto: utilidad
  }
];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Panel</h2>
        <p className="text-slate-500">
          Resumen inteligente del sistema LiquorPro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <StatCard title="Productos" value={resumen?.totalProductos ?? 0} icon={<FaBoxOpen />} />
        <StatCard title="Clientes" value={resumen?.totalClientes ?? 0} icon={<FaUsers />} />
        <StatCard title="Proveedores" value={resumen?.totalProveedores ?? 0} icon={<FaTruck />} />
        <StatCard title="Ventas" value={resumen?.totalVentas ?? 0} icon={<FaCashRegister />} />
        <StatCard title="Compras" value={resumen?.totalCompras ?? 0} icon={<FaShoppingCart />} />
        <StatCard title="Stock bajo" value={resumen?.productosStockBajo ?? 0} icon={<FaExclamationTriangle />} />
        <StatCard title="Monto vendido" value={`S/ ${montoVentas.toFixed(2)}`} icon={<FaMoneyBillWave />} />
        <StatCard title="Monto comprado" value={`S/ ${montoCompras.toFixed(2)}`} icon={<FaMoneyBillWave />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-blue-600 text-2xl" />
            <h3 className="text-xl font-bold text-slate-800">
              Utilidad bruta
            </h3>
          </div>

          <p className={`text-4xl font-bold ${utilidad >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            S/ {utilidad.toFixed(2)}
          </p>

          <p className="text-slate-500 mt-3">
            Diferencia entre ventas y compras registradas.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Estado del inventario
          </h3>

          {resumen?.productosStockBajo > 0 ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
              Hay {resumen.productosStockBajo} producto(s) con stock bajo.
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4">
              Todos los productos se encuentran con stock suficiente.
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Actividad comercial
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Ventas registradas</span>
              <strong>{resumen?.totalVentas ?? 0}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Compras registradas</span>
              <strong>{resumen?.totalCompras ?? 0}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Clientes activos</span>
              <strong>{resumen?.totalClientes ?? 0}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Proveedores activos</span>
              <strong>{resumen?.totalProveedores ?? 0}</strong>
            </div>
          </div>
        </div>
            </div>

      <div className="bg-white rounded-xl shadow border border-slate-200 p-6 mt-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Comparativo financiero
        </h3>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datosGrafico}>
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip
  formatter={(value) => [`S/ ${Number(value).toFixed(2)}`, 'Monto']}
/>
              <Bar
  dataKey="monto"
  fill="#2563eb"
  radius={[8, 8, 0, 0]}
/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}