import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import CrudPage from '../components/CrudPage';
import CrudModal from '../components/CrudModal';
import ConfirmDialog from '../components/ConfirmDialog';

import {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from '../services/proveedorService';

const proveedorInicial = {
  nombre: '',
  ruc: '',
  telefono: '',
  email: '',
  direccion: ''
};

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proveedorEditando, setProveedorEditando] = useState(null);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);
  const [formulario, setFormulario] = useState(proveedorInicial);

  const cargarProveedores = async () => {
    try {
      setLoading(true);
      const data = await obtenerProveedores();
      setProveedores(data);
    } catch (error) {
      toast.error('Error al cargar proveedores');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const abrirNuevo = () => {
    setProveedorEditando(null);
    setFormulario(proveedorInicial);
    setModalAbierto(true);
  };

  const abrirEditar = (proveedor) => {
    setProveedorEditando(proveedor);
    setFormulario({
      nombre: proveedor.nombre,
      ruc: proveedor.ruc || '',
      telefono: proveedor.telefono || '',
      email: proveedor.email || '',
      direccion: proveedor.direccion || ''
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProveedorEditando(null);
    setFormulario(proveedorInicial);
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const guardarProveedor = async (e) => {
    e.preventDefault();

    try {
      if (proveedorEditando) {
        await actualizarProveedor(proveedorEditando.id, formulario);
        toast.success('Proveedor actualizado');
      } else {
        await crearProveedor(formulario);
        toast.success('Proveedor creado');
      }

      cerrarModal();
      cargarProveedores();
    } catch (error) {
      toast.error('Error al guardar proveedor');
      console.error(error);
    }
  };

  const eliminarProveedorSeleccionado = async () => {
    try {
      await eliminarProveedor(proveedorAEliminar.id);
      toast.success('Proveedor eliminado');
      setProveedorAEliminar(null);
      cargarProveedores();
    } catch (error) {
      toast.error('Error al eliminar proveedor');
      console.error(error);
    }
  };

  const proveedoresFiltrados = proveedores.filter((proveedor) => {
    const texto = busqueda.toLowerCase();

    return (
      proveedor.nombre.toLowerCase().includes(texto) ||
      (proveedor.ruc || '').toLowerCase().includes(texto) ||
      (proveedor.email || '').toLowerCase().includes(texto)
    );
  });

  const columns = [
    { key: 'nombre', title: 'Proveedor' },
    { key: 'ruc', title: 'RUC' },
    { key: 'telefono', title: 'Teléfono' },
    { key: 'email', title: 'Email' },
    { key: 'direccion', title: 'Dirección' },
    {
      key: 'acciones',
      title: 'Acciones',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => abrirEditar(row)}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Editar
          </button>

          <button
            onClick={() => setProveedorAEliminar(row)}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      )
    }
  ];

  const fields = [
    { name: 'nombre', placeholder: 'Nombre del proveedor', required: true },
    { name: 'ruc', placeholder: 'RUC' },
    { name: 'telefono', placeholder: 'Teléfono' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    {
      name: 'direccion',
      placeholder: 'Dirección',
      className: 'border rounded-lg px-3 py-2 md:col-span-3'
    }
  ];

  return (
    <>
      <CrudPage
        title="Proveedores"
        subtitle="Gestión de proveedores de la licorería"
        actionLabel="Nuevo proveedor"
        onAction={abrirNuevo}
        loading={loading}
        searchValue={busqueda}
        onSearchChange={setBusqueda}
        searchPlaceholder="Buscar por proveedor, RUC o email..."
        filters={[]}
        onClearFilters={() => setBusqueda('')}
        columns={columns}
        data={proveedoresFiltrados}
        emptyMessage="No hay proveedores registrados"
      />

      <CrudModal
        open={modalAbierto}
        title={proveedorEditando ? 'Editar proveedor' : 'Nuevo proveedor'}
        fields={fields}
        values={formulario}
        onChange={handleChange}
        onSubmit={guardarProveedor}
        onCancel={cerrarModal}
      />

      {proveedorAEliminar && (
        <ConfirmDialog
          title="Eliminar proveedor"
          message={`¿Seguro que deseas eliminar "${proveedorAEliminar.nombre}"?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onCancel={() => setProveedorAEliminar(null)}
          onConfirm={eliminarProveedorSeleccionado}
        />
      )}
    </>
  );
}