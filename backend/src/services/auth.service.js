const prisma = require('../config/prisma');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const login = async ({ email, password }) => {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
    include: { rol: true }
  });

  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }

  if (!usuario.estado) {
    throw new Error('Usuario inactivo');
  }

  const passwordValida = await comparePassword(password, usuario.password);

  if (!passwordValida) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken({
    id: usuario.id,
    email: usuario.email,
    rol: usuario.rol.nombre
  });

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol.nombre
    }
  };
};

const getPerfil = async (usuarioId) => {
  return prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: {
      id: true,
      nombre: true,
      email: true,
      estado: true,
      rol: {
        select: {
          nombre: true
        }
      }
    }
  });
};

module.exports = {
  login,
  getPerfil
};