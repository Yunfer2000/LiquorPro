import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          Sistema Inteligente de Gestión
        </h1>
        <p className="text-sm text-slate-500">Panel administrativo</p>
      </div>

      <div className="flex items-center gap-3 text-slate-700">
        <FaUserCircle className="text-2xl" />
        <div className="text-sm">
          <p className="font-semibold">Administrador</p>
          <p className="text-slate-500">admin@liquorpro.com</p>
        </div>
      </div>
    </header>
  );
}