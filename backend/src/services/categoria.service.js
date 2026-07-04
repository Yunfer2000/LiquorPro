const prisma = require('../config/prisma');

const listarCategorias = async () => {
  return await prisma.categoria.findMany({
    where: {
      estado: true
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

const crearCategoria = async (datos) => {
  return await prisma.categoria.create({
    data: {
      nombre: datos.nombre,
      descripcion: datos.descripcion || ''
    }
  });
};

const actualizarCategoria = async (id, datos) => {
  return await prisma.categoria.update({
    where: {
      id: Number(id)
    },
    data: {
      nombre: datos.nombre,
      descripcion: datos.descripcion || ''
    }
  });
};

const eliminarCategoria = async (id) => {
  return await prisma.categoria.update({
    where: {
      id: Number(id)
    },
    data: {
      estado: false
    }
  });
};

module.exports = {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};