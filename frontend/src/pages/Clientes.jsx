import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import CrudPage from '../components/CrudPage';
import CrudModal from '../components/CrudModal';
import ConfirmDialog from '../components/ConfirmDialog';

import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from '../services/clienteService';

const clienteInicial = {
  nombres: '',
  apellidos: '',
  dni: '',
  telefono: '',
  email: '',
  direccion: ''
};

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [formulario, setFormulario] = useState(clienteInicial);

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const data = await obtenerClientes();
      setClientes(data);
    } catch (error) {
      toast.error('Error al cargar clientes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const abrirNuevo = () => {
    setClienteEditando(null);
    setFormulario(clienteInicial);
    setModalAbierto(true);
  };

  const abrirEditar = (cliente) => {
    setClienteEditando(cliente);
    setFormulario({
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      dni: cliente.dni || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      direccion: cliente.direccion || ''
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setClienteEditando(null);
    setFormulario(clienteInicial);
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const guardarCliente = async (e) => {
    e.preventDefault();

    try {
      if (clienteEditando) {
        await actualizarCliente(clienteEditando.id, formulario);
        toast.success('Cliente actualizado');
      } else {
        await crearCliente(formulario);
        toast.success('Cliente creado');
      }

      cerrarModal();
      cargarClientes();
    } catch (error) {
      toast.error('Error al guardar cliente');
      console.error(error);
    }
  };

  const eliminarClienteSeleccionado = async () => {
    try {
      await eliminarCliente(clienteAEliminar.id);
      toast.success('Cliente eliminado');
      setClienteAEliminar(null);
      cargarClientes();
    } catch (error) {
      toast.error('Error al eliminar cliente');
      console.error(error);
    }
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = busqueda.toLowerCase();

    return (
      cliente.nombres.toLowerCase().includes(texto) ||
      cliente.apellidos.toLowerCase().includes(texto) ||
      (cliente.dni || '').toLowerCase().includes(texto)
    );
  });

  const columns = [
    { key: 'nombres', title: 'Nombres' },
    { key: 'apellidos', title: 'Apellidos' },
    { key: 'dni', title: 'DNI' },
    { key: 'telefono', title: 'Teléfono' },
    { key: 'email', title: 'Email' },
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
            onClick={() => setClienteAEliminar(row)}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      )
    }
  ];

  const fields = [
    { name: 'nombres', placeholder: 'Nombres', required: true },
    { name: 'apellidos', placeholder: 'Apellidos', required: true },
    { name: 'dni', placeholder: 'DNI' },
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
        title="Clientes"
        subtitle="Gestión de clientes de la licorería"
        actionLabel="Nuevo cliente"
        onAction={abrirNuevo}
        loading={loading}
        searchValue={busqueda}
        onSearchChange={setBusqueda}
        searchPlaceholder="Buscar por nombres, apellidos o DNI..."
        filters={[]}
        onClearFilters={() => setBusqueda('')}
        columns={columns}
        data={clientesFiltrados}
        emptyMessage="No hay clientes registrados"
      />

      <CrudModal
        open={modalAbierto}
        title={clienteEditando ? 'Editar cliente' : 'Nuevo cliente'}
        fields={fields}
        values={formulario}
        onChange={handleChange}
        onSubmit={guardarCliente}
        onCancel={cerrarModal}
      />

      {clienteAEliminar && (
        <ConfirmDialog
          title="Eliminar cliente"
          message={`¿Seguro que deseas eliminar "${clienteAEliminar.nombres} ${clienteAEliminar.apellidos}"?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onCancel={() => setClienteAEliminar(null)}
          onConfirm={eliminarClienteSeleccionado}
        />
      )}
    </>
  );
}