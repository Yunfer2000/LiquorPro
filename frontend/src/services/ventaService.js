import api from '../api/axios';

export const obtenerClientesVenta = async () => {
  const response = await api.get('/ventas/clientes');
  return response.data.data;
};

export const obtenerProductosVenta = async () => {
  const response = await api.get('/ventas/productos');
  return response.data.data;
};

export const crearVenta = async (venta) => {
  const response = await api.post('/ventas', venta);
  return response.data.data;
};

export const obtenerVentas = async () => {
  const response = await api.get('/ventas');
  return response.data.data;
};

export const obtenerVentaPorId = async (id) => {
  const response = await api.get(`/ventas/${id}`);
  return response.data.data;
};