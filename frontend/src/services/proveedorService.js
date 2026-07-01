import api from '../api/axios';

export const obtenerProveedores = async () => {
  const response = await api.get('/proveedores');
  return response.data.data;
};

export const crearProveedor = async (proveedor) => {
  const response = await api.post('/proveedores', proveedor);
  return response.data.data;
};

export const actualizarProveedor = async (id, proveedor) => {
  const response = await api.put(`/proveedores/${id}`, proveedor);
  return response.data.data;
};

export const eliminarProveedor = async (id) => {
  const response = await api.delete(`/proveedores/${id}`);
  return response.data;
};