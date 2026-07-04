import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import CrudPage from '../components/CrudPage';
import CrudModal from '../components/CrudModal';
import ConfirmDialog from '../components/ConfirmDialog';

import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from '../services/categoriaService';

const categoriaInicial = {
  nombre: '',
  descripcion: ''
};

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [formulario, setFormulario] = useState(categoriaInicial);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error) {
      toast.error('Error al cargar categorías');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const abrirNuevo = () => {
    setCategoriaEditando(null);
    setFormulario(categoriaInicial);
    setModalAbierto(true);
  };

  const abrirEditar = (categoria) => {
    setCategoriaEditando(categoria);
    setFormulario({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || ''
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCategoriaEditando(null);
    setFormulario(categoriaInicial);
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    try {
      if (categoriaEditando) {
        await actualizarCategoria(categoriaEditando.id, formulario);
        toast.success('Categoría actualizada');
      } else {
        await crearCategoria(formulario);
        toast.success('Categoría creada');
      }

      cerrarModal();
      cargarCategorias();
    } catch (error) {
      toast.error('Error al guardar categoría');
      console.error(error);
    }
  };

  const eliminarCategoriaSeleccionada = async () => {
    try {
      await eliminarCategoria(categoriaAEliminar.id);
      toast.success('Categoría eliminada');
      setCategoriaAEliminar(null);
      cargarCategorias();
    } catch (error) {
      toast.error('Error al eliminar categoría');
      console.error(error);
    }
  };

  const categoriasFiltradas = categorias.filter((categoria) => {
    const texto = busqueda.toLowerCase();

    return (
      categoria.nombre.toLowerCase().includes(texto) ||
      (categoria.descripcion || '').toLowerCase().includes(texto)
    );
  });

  const columns = [
    { key: 'nombre', title: 'Categoría' },
    { key: 'descripcion', title: 'Descripción' },
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
            onClick={() => setCategoriaAEliminar(row)}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      )
    }
  ];

  const fields = [
    {
      name: 'nombre',
      placeholder: 'Nombre de la categoría',
      required: true
    },
    {
      name: 'descripcion',
      placeholder: 'Descripción',
      className: 'border rounded-lg px-3 py-2 md:col-span-2'
    }
  ];

  return (
    <>
      <CrudPage
        title="Categorías"
        subtitle="Gestión de categorías de productos"
        actionLabel="Nueva categoría"
        onAction={abrirNuevo}
        loading={loading}
        searchValue={busqueda}
        onSearchChange={setBusqueda}
        searchPlaceholder="Buscar categoría..."
        filters={[]}
        onClearFilters={() => setBusqueda('')}
        columns={columns}
        data={categoriasFiltradas}
        emptyMessage="No hay categorías registradas"
      />

      <CrudModal
        open={modalAbierto}
        title={categoriaEditando ? 'Editar categoría' : 'Nueva categoría'}
        fields={fields}
        values={formulario}
        onChange={handleChange}
        onSubmit={guardarCategoria}
        onCancel={cerrarModal}
      />

      {categoriaAEliminar && (
        <ConfirmDialog
          title="Eliminar categoría"
          message={`¿Seguro que deseas eliminar "${categoriaAEliminar.nombre}"?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onCancel={() => setCategoriaAEliminar(null)}
          onConfirm={eliminarCategoriaSeleccionada}
        />
      )}
    </>
  );
}