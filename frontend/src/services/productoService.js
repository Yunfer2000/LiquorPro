import api from '../api/axios';

export const obtenerProductos = async () => {
  const response = await api.get('/productos');
  return response.data.data;
};

export const obtenerCategorias = async () => {
  const response = await api.get('/productos/categorias');
  return response.data.data;
};

export const crearProducto = async (producto) => {
  const response = await api.post('/productos', producto);
  return response.data.data;
};

export const actualizarProducto = async (id, producto) => {
  const response = await api.put(`/productos/${id}`, producto);
  return response.data.data;
};

export const eliminarProducto = async (id) => {
  const response = await api.delete(`/productos/${id}`);
  return response.data;
};