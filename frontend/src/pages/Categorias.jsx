import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import CrudPage from '../components/CrudPage';

import { obtenerCategorias } from '../services/categoriaService';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

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

  const categoriasFiltradas = categorias.filter((categoria) => {
    const texto = busqueda.toLowerCase();

    return (
      categoria.nombre.toLowerCase().includes(texto) ||
      (categoria.descripcion || '').toLowerCase().includes(texto)
    );
  });

  const columns = [
    { key: 'nombre', title: 'Categoría' },
    { key: 'descripcion', title: 'Descripción' }
  ];

  return (
    <CrudPage
      title="Categorías"
      subtitle="Catálogo de categorías de productos"
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
  );
}