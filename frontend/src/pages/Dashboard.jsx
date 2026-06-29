import { useEffect, useState } from 'react';
import { FaBoxOpen, FaUsers, FaTruck, FaShoppingCart, FaCashRegister, FaMoneyBillWave } from 'react-icons/fa';
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

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-slate-500">Resumen general del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Productos" value={resumen?.totalProductos ?? 0} icon={<FaBoxOpen />} />
        <StatCard title="Clientes" value={resumen?.totalClientes ?? 0} icon={<FaUsers />} />
        <StatCard title="Proveedores" value={resumen?.totalProveedores ?? 0} icon={<FaTruck />} />
        <StatCard title="Ventas" value={resumen?.totalVentas ?? 0} icon={<FaCashRegister />} />
        <StatCard title="Compras" value={resumen?.totalCompras ?? 0} icon={<FaShoppingCart />} />
        <StatCard title="Stock bajo" value={resumen?.productosStockBajo ?? 0} icon={<FaBoxOpen />} />
        <StatCard title="Monto vendido" value={`S/ ${resumen?.montoVentas ?? 0}`} icon={<FaMoneyBillWave />} />
        <StatCard title="Monto comprado" value={`S/ ${resumen?.montoCompras ?? 0}`} icon={<FaMoneyBillWave />} />
      </div>
    </DashboardLayout>
  );
}