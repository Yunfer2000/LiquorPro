import api from '../api/axios';

export const obtenerReporteVentas = async () => {
  const response = await api.get('/reportes/ventas');
  return response.data.data;
};

export const obtenerReporteCompras = async () => {
  const response = await api.get('/reportes/compras');
  return response.data.data;
};

export const obtenerReporteInventario = async () => {
  const response = await api.get('/reportes/inventario');
  return response.data.data;
};