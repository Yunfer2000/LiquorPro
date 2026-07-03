import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../layouts/DashboardLayout';
import Loading from '../components/Loading';
import Modal from '../components/Modal';

import {
  obtenerVentas,
  obtenerProductosVenta,
  obtenerClientesVenta,
  crearVenta
} from '../services/ventaService';

export default function Ventas() {
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);

  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState('');

const [fecha, setFecha] = useState(
  new Date().toISOString().split('T')[0]
);

const [productoId, setProductoId] = useState('');
const [cantidad, setCantidad] = useState('');
const [precioVenta, setPrecioVenta] = useState('');

const [detalleVenta, setDetalleVenta] = useState([]);

const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const [ventasData, productosData, clientesData] =
        await Promise.all([
          obtenerVentas(),
          obtenerProductosVenta(),
          obtenerClientesVenta()
        ]);

      setVentas(ventasData);
      setProductos(productosData);
      setClientes(clientesData);
    } catch (error) {
      toast.error('Error al cargar ventas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const agregarProducto = () => {
  if (!productoId || !cantidad || !precioVenta) {
    toast.error('Complete todos los campos');
    return;
  }

  const existe = detalleVenta.find(
    (item) => item.productoId === Number(productoId)
  );

  if (existe) {
    toast.error('Ese producto ya fue agregado');
    return;
  }

  const producto = productos.find(
    (p) => p.id === Number(productoId)
  );

  if (!producto) return;

  if (Number(cantidad) > producto.stock) {
    toast.error('Stock insuficiente');
    return;
  }

  const nuevoDetalle = {
    productoId: producto.id,
    nombre: producto.nombre,
    cantidad: Number(cantidad),
    precioVenta: Number(precioVenta),
    subtotal: Number(cantidad) * Number(precioVenta)
  };

  setDetalleVenta([...detalleVenta, nuevoDetalle]);

  setProductoId('');
  setCantidad('');
  setPrecioVenta('');
};

const guardarVenta = async (e) => {
  e.preventDefault();

  if (!clienteId) {
    toast.error('Seleccione un cliente');
    return;
  }

  if (detalleVenta.length === 0) {
    toast.error('Agregue al menos un producto');
    return;
  }

  const datos = {
    clienteId: Number(clienteId),
    detalles: detalleVenta.map((item) => ({
      productoId: item.productoId,
      cantidad: item.cantidad,
      precioUnitario: item.precioVenta
    }))
  };

  try {
    await crearVenta(datos);

    toast.success('Venta registrada correctamente');

    setModalAbierto(false);

    setClienteId('');
    setFecha(new Date().toISOString().split('T')[0]);
    setProductoId('');
    setCantidad('');
    setPrecioVenta('');
    setDetalleVenta([]);

    cargarDatos();

  } catch (error) {
    toast.error(
      error.response?.data?.message || 'Error al registrar venta'
    );

    console.error(error);
  }
};

  if (loading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Ventas
          </h2>

          <p className="text-slate-500">
            Registro de ventas y salida de inventario
          </p>
        </div>

        <button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
        >
          Nueva venta
        </button>

      </div>

      <div className="bg-white rounded-xl shadow border border-slate-200 p-6">

        <div className="grid grid-cols-3 gap-6">

          <div>
            <h3 className="font-semibold text-slate-700">
              Ventas registradas
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {ventas.length}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">
              Productos disponibles
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {productos.length}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">
              Clientes
            </h3>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {clientes.length}
            </p>
          </div>

        </div>

      </div>
      <div className="bg-white rounded-xl shadow border border-slate-200 p-6 mt-6">
  <h3 className="text-xl font-bold text-slate-800 mb-4">
    Historial de ventas
  </h3>

  {ventas.length === 0 ? (
    <div className="text-center text-slate-500 py-6">
      No hay ventas registradas
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Fecha</th>
            <th className="px-4 py-3 text-left">Cliente</th>
            <th className="px-4 py-3 text-center">Productos</th>
            <th className="px-4 py-3 text-center">Total</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id} className="border-t hover:bg-slate-50">
              <td className="px-4 py-3">
                {new Date(venta.fecha).toLocaleDateString('es-PE')}
              </td>

              <td className="px-4 py-3">
                {venta.cliente
                  ? `${venta.cliente.nombres} ${venta.cliente.apellidos}`
                  : '-'}
              </td>

              <td className="px-4 py-3 text-center">
                {venta.detalles?.length || 0}
              </td>

              <td className="px-4 py-3 text-center font-semibold">
                S/ {Number(venta.total).toFixed(2)}
              </td>

              <td className="px-4 py-3 text-center">
                <button
                  type="button"
                  onClick={() => setVentaSeleccionada(venta)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

      {modalAbierto && (
        <Modal
          title="Nueva venta"
          onClose={() => setModalAbierto(false)}
        >
          <form onSubmit={guardarVenta} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Cliente
      </label>

      <select
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Seleccione cliente</option>

        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombres} {cliente.apellidos}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Fecha
      </label>

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      />
    </div>
  </div>

  <div className="border-t pt-5">
    <h4 className="font-semibold text-slate-800 mb-4">
      Agregar productos
    </h4>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <select
        value={productoId}
        onChange={(e) => {
          const id = e.target.value;
          setProductoId(id);

          const producto = productos.find((p) => p.id === Number(id));

          if (producto) {
            setPrecioVenta(producto.precioVenta);
          }
        }}
        className="border rounded-lg px-3 py-2 md:col-span-2"
      >
        <option value="">Seleccione producto</option>

        {productos.map((producto) => (
          <option key={producto.id} value={producto.id}>
            {producto.nombre} - Stock: {producto.stock}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        className="border rounded-lg px-3 py-2"
      />

      <input
        type="number"
        placeholder="Precio venta"
        value={precioVenta}
        onChange={(e) => setPrecioVenta(e.target.value)}
        className="border rounded-lg px-3 py-2"
      />
    </div>

    <button
      type="button"
      onClick={agregarProducto}
      className="mt-4 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900"
    >
      Agregar producto
    </button>
  </div>

  <div className="border-t pt-5">
    <h4 className="font-semibold text-slate-800 mb-3">
      Detalle de venta
    </h4>

    {detalleVenta.length === 0 ? (
      <div className="bg-slate-50 border rounded-lg p-4 text-slate-500 text-center">
        Todavía no hay productos agregados
      </div>
    ) : (
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-center">Cantidad</th>
              <th className="px-4 py-3 text-center">Precio</th>
              <th className="px-4 py-3 text-center">Subtotal</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {detalleVenta.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">{item.nombre}</td>

                <td className="px-4 py-3 text-center">
                  {item.cantidad}
                </td>

                <td className="px-4 py-3 text-center">
                  S/ {item.precioVenta.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-center font-semibold">
                  S/ {item.subtotal.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setDetalleVenta(
                        detalleVenta.filter((_, i) => i !== index)
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    <div className="flex justify-end mt-5">
      <div className="text-2xl font-bold text-slate-800">
        Total: S/{" "}
        {detalleVenta
          .reduce((total, item) => total + item.subtotal, 0)
          .toFixed(2)}
      </div>
    </div>
  </div>

  <div className="border-t pt-5 flex justify-end gap-3">
    <button
      type="button"
      onClick={() => setModalAbierto(false)}
      className="px-4 py-2 rounded-lg border"
    >
      Cancelar
    </button>

    <button
      type="submit"
      className="px-4 py-2 rounded-lg bg-blue-600 text-white"
    >
      Guardar venta
    </button>
  </div>
</form>

        </Modal>
      )}
      {ventaSeleccionada && (
  <Modal
    title={`Venta #${ventaSeleccionada.id}`}
    onClose={() => setVentaSeleccionada(null)}
  >
    <div className="space-y-4">
      <div>
        <strong>Cliente:</strong>{' '}
        {ventaSeleccionada.cliente
          ? `${ventaSeleccionada.cliente.nombres} ${ventaSeleccionada.cliente.apellidos}`
          : '-'}
      </div>

      <div>
        <strong>Fecha:</strong>{' '}
        {new Date(ventaSeleccionada.fecha).toLocaleDateString('es-PE')}
      </div>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-2 text-left">Producto</th>
            <th className="p-2 text-center">Cant.</th>
            <th className="p-2 text-center">Precio</th>
            <th className="p-2 text-center">Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {ventaSeleccionada.detalles.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.producto.nombre}</td>
              <td className="p-2 text-center">{item.cantidad}</td>
              <td className="p-2 text-center">
                S/ {Number(item.precioUnitario).toFixed(2)}
              </td>
              <td className="p-2 text-center font-semibold">
                S/ {Number(item.subtotal).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right text-2xl font-bold">
        Total: S/ {Number(ventaSeleccionada.total).toFixed(2)}
      </div>
    </div>
  </Modal>
)}

    </DashboardLayout>
  );
}