const prisma = require('../config/prisma');

const listarProveedores = async () => {
  return await prisma.proveedor.findMany({
    where: {
      estado: true
    },
    orderBy: {
      nombre: 'asc'
    }
  });
};

const crearProveedor = async (datos) => {
  return await prisma.proveedor.create({
    data: {
      nombre: datos.nombre,
      ruc: datos.ruc,
      telefono: datos.telefono,
      email: datos.email,
      direccion: datos.direccion
    }
  });
};

const obtenerProveedorPorId = async (id) => {
  const proveedor = await prisma.proveedor.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!proveedor || !proveedor.estado) {
    throw new Error('Proveedor no encontrado');
  }

  return proveedor;
};

const actualizarProveedor = async (id, datos) => {
  await obtenerProveedorPorId(id);

  return await prisma.proveedor.update({
    where: {
      id: Number(id)
    },
    data: {
      nombre: datos.nombre,
      ruc: datos.ruc,
      telefono: datos.telefono,
      email: datos.email,
      direccion: datos.direccion
    }
  });
};

const eliminarProveedor = async (id) => {
  await obtenerProveedorPorId(id);

  return await prisma.proveedor.update({
    where: {
      id: Number(id)
    },
    data: {
      estado: false
    }
  });
};

module.exports = {
  listarProveedores,
  crearProveedor,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor
};