const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@liquorpro.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123';

  const rolAdministrador = await prisma.rol.upsert({
    where: {
      nombre: 'ADMINISTRADOR'
    },
    update: {},
    create: {
      nombre: 'ADMINISTRADOR'
    }
  });

  await prisma.rol.upsert({
    where: {
      nombre: 'VENDEDOR'
    },
    update: {},
    create: {
      nombre: 'VENDEDOR'
    }
  });

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.usuario.upsert({
    where: {
      email: adminEmail
    },
    update: {
      nombre: 'Administrador',
      password: passwordHash,
      estado: true,
      rolId: rolAdministrador.id
    },
    create: {
      nombre: 'Administrador',
      email: adminEmail,
      password: passwordHash,
      estado: true,
      rolId: rolAdministrador.id
    }
  });

  const categorias = [
    {
      nombre: 'Cerveza',
      descripcion: 'Cervezas nacionales e importadas'
    },
    {
      nombre: 'Pisco',
      descripcion: 'Piscos peruanos'
    },
    {
      nombre: 'Ron',
      descripcion: 'Bebidas tipo ron'
    },
    {
      nombre: 'Vino',
      descripcion: 'Vinos nacionales e importados'
    },
    {
      nombre: 'Vodka',
      descripcion: 'Bebidas tipo vodka'
    },
    {
      nombre: 'Whisky',
      descripcion: 'Bebidas tipo whisky'
    }
  ];

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: {
        nombre: categoria.nombre
      },
      update: {
        descripcion: categoria.descripcion,
        estado: true
      },
      create: {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        estado: true
      }
    });
  }

  console.log('Datos iniciales creados correctamente');
  console.log(`Administrador: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error('Error al ejecutar el seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });