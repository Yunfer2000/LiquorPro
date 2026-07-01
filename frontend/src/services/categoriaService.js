import api from '../api/axios';

export const obtenerCategorias = async () => {
  const response = await api.get('/productos/categorias');
  return response.data.data;
};

export const crearCategoria = async () => {
  throw new Error('El backend aún no tiene endpoint para crear categorías');
};

export const actualizarCategoria = async () => {
  throw new Error('El backend aún no tiene endpoint para actualizar categorías');
};

export const eliminarCategoria = async () => {
  throw new Error('El backend aún no tiene endpoint para eliminar categorías');
};