import { NavLink } from 'react-router-dom';
import {
  FaChartLine,
  FaBoxOpen,
  FaShoppingCart,
  FaCashRegister,
  FaUsers,
  FaTruck,
  FaFileAlt
} from 'react-icons/fa';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: <FaChartLine /> },
  { path: '/productos', label: 'Productos', icon: <FaBoxOpen /> },
  { path: '/compras', label: 'Compras', icon: <FaShoppingCart /> },
  { path: '/ventas', label: 'Ventas', icon: <FaCashRegister /> },
  { path: '/clientes', label: 'Clientes', icon: <FaUsers /> },
  { path: '/proveedores', label: 'Proveedores', icon: <FaTruck /> },
  { path: '/reportes', label: 'Reportes', icon: <FaFileAlt /> }
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        LiquorPro
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}