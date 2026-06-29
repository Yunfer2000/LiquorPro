import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../layouts/DashboardLayout';
import DataTable from '../components/DataTable';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  obtenerProductos,
  obtenerCategorias,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productoService';

const productoInicial = {
  nombre: '',
  descripcion: '',
  marca: '',
  precioCompra: '',
  precioVenta: '',
  stock: '',
  stockMinimo: '',
  categoriaId: ''
};

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [formulario, setFormulario] = useState(productoInicial);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const [productosData, categoriasData] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias()
      ]);

      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (error) {
      toast.error('Error al cargar productos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirFormularioNuevo = () => {
    setProductoEditando(null);
    setFormulario(productoInicial);
    setMostrarFormulario(true);
  };

  const abrirFormularioEditar = (producto) => {
    setProductoEditando(producto);
    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      marca: producto.marca || '',
      precioCompra: producto.precioCompra,
      precioVenta: producto.precioVenta,
      stock: producto.stock,
      stockMinimo: producto.stockMinimo,
      categoriaId: producto.categoriaId
    });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    setFormulario(productoInicial);
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    const datos = {
      ...formulario,
      precioCompra: Number(formulario.precioCompra),
      precioVenta: Number(formulario.precioVenta),
      stock: Number(formulario.stock),
      stockMinimo: Number(formulario.stockMinimo),
      categoriaId: Number(formulario.categoriaId)
    };

    try {
      if (productoEditando) {
        await actualizarProducto(productoEditando.id, datos);
        toast.success('Producto actualizado');
      } else {
        await crearProducto(datos);
        toast.success('Producto creado');
      }

      cerrarFormulario();
      cargarDatos();
    } catch (error) {
      toast.error('Error al guardar producto');
      console.error(error);
    }
  };

  const confirmarEliminar = (producto) => {
    setProductoAEliminar(producto);
  };

  const eliminarProductoSeleccionado = async () => {
    try {
      await eliminarProducto(productoAEliminar.id);
      toast.success('Producto eliminado');
      setProductoAEliminar(null);
      cargarDatos();
    } catch (error) {
      toast.error('Error al eliminar producto');
      console.error(error);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    const textoBusqueda = busqueda.toLowerCase();

    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(textoBusqueda) ||
      (producto.marca || '').toLowerCase().includes(textoBusqueda);

    const coincideCategoria = categoriaFiltro
      ? producto.categoriaId === Number(categoriaFiltro)
      : true;

    return coincideBusqueda && coincideCategoria;
  });

  const columns = [
    { key: 'nombre', title: 'Producto' },
    { key: 'marca', title: 'Marca' },
    {
      key: 'categoria',
      title: 'Categoría',
      render: (row) => row.categoria?.nombre || '-'
    },
    {
      key: 'precioVenta',
      title: 'Precio venta',
      render: (row) => `S/ ${row.precioVenta}`
    },
    {
      key: 'stock',
      title: 'Existencias',
      render: (row) => (
        <span
          className={
            row.stock <= row.stockMinimo
              ? 'px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700'
              : 'px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700'
          }
        >
          {row.stock}
        </span>
      )
    },
    {
      key: 'acciones',
      title: 'Acciones',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => abrirFormularioEditar(row)}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Editar
          </button>
          <button
            onClick={() => confirmarEliminar(row)}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Productos</h2>
          <p className="text-slate-500">Gestión de productos de la licorería</p>
        </div>

        <button
          onClick={abrirFormularioNuevo}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Nuevo producto
        </button>
      </div>

      {mostrarFormulario && (
        <Modal
          title={productoEditando ? 'Editar producto' : 'Nuevo producto'}
          onClose={cerrarFormulario}
        >
          <form
            onSubmit={guardarProducto}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="border rounded-lg px-3 py-2"
              required
            />

            <input
              name="marca"
              value={formulario.marca}
              onChange={handleChange}
              placeholder="Marca"
              className="border rounded-lg px-3 py-2"
            />

            <select
              name="categoriaId"
              value={formulario.categoriaId}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
              required
            >
              <option value="">Seleccione categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>

            <input
              name="precioCompra"
              type="number"
              step="0.01"
              value={formulario.precioCompra}
              onChange={handleChange}
              placeholder="Precio compra"
              className="border rounded-lg px-3 py-2"
              required
            />

            <input
              name="precioVenta"
              type="number"
              step="0.01"
              value={formulario.precioVenta}
              onChange={handleChange}
              placeholder="Precio venta"
              className="border rounded-lg px-3 py-2"
              required
            />

            <input
              name="stock"
              type="number"
              value={formulario.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="border rounded-lg px-3 py-2"
              required
            />

            <input
              name="stockMinimo"
              type="number"
              value={formulario.stockMinimo}
              onChange={handleChange}
              placeholder="Stock mínimo"
              className="border rounded-lg px-3 py-2"
              required
            />

            <input
              name="descripcion"
              value={formulario.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              className="border rounded-lg px-3 py-2 md:col-span-2"
            />

            <div className="md:col-span-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={cerrarFormulario}
                className="px-4 py-2 rounded-lg border"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre o marca..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setBusqueda('');
              setCategoriaFiltro('');
            }}
            className="border border-slate-300 rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={productosFiltrados}
        emptyMessage="No hay productos registrados"
      />

      {productoAEliminar && (
        <ConfirmDialog
          title="Eliminar producto"
          message={`¿Seguro que deseas eliminar "${productoAEliminar.nombre}"?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onCancel={() => setProductoAEliminar(null)}
          onConfirm={eliminarProductoSeleccionado}
        />
      )}
    </DashboardLayout>
  );
}