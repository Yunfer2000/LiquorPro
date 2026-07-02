import api from '../api/axios';

export const obtenerProveedoresCompra = async () => {
  const response = await api.get('/compras/proveedores');
  return response.data.data;
};

export const obtenerProductosCompra = async () => {
  const response = await api.get('/compras/productos');
  return response.data.data;
};

export const crearCompra = async (compra) => {
  const response = await api.post('/compras', compra);
  return response.data.data;
};

export const obtenerCompras = async () => {
  const response = await api.get('/compras');
  return response.data.data;
};

export const obtenerCompraPorId = async (id) => {
  const response = await api.get(`/compras/${id}`);
  return response.data.data;
};