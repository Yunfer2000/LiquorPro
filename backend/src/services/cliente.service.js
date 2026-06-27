const prisma = require('../config/prisma');

const listarClientes = async () => {
  return await prisma.cliente.findMany({
    where: {
      estado: true
    },
    orderBy: {
      apellidos: 'asc'
    }
  });
};

const crearCliente = async (datos) => {
  return await prisma.cliente.create({
    data: {
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      dni: datos.dni,
      telefono: datos.telefono,
      email: datos.email,
      direccion: datos.direccion
    }
  });
};

const obtenerClientePorId = async (id) => {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!cliente || !cliente.estado) {
    throw new Error('Cliente no encontrado');
  }

  return cliente;
};

const actualizarCliente = async (id, datos) => {
  await obtenerClientePorId(id);

  return await prisma.cliente.update({
    where: {
      id: Number(id)
    },
    data: {
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      dni: datos.dni,
      telefono: datos.telefono,
      email: datos.email,
      direccion: datos.direccion
    }
  });
};

const eliminarCliente = async (id) => {
  await obtenerClientePorId(id);

  return await prisma.cliente.update({
    where: {
      id: Number(id)
    },
    data: {
      estado: false
    }
  });
};

module.exports = {
  listarClientes,
  crearCliente,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente
};