require('dotenv').config({
  path: '.env.test',
  quiet: true
});

const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

describe('Pruebas de integración del módulo de compras', () => {
  let token;
  let proveedor;
  let producto;
  let stockOriginal;
  let compraCreadaId;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD
      });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.success).toBe(true);
    expect(loginResponse.body.data).toHaveProperty('token');

    token = loginResponse.body.data.token;

    proveedor = await prisma.proveedor.findFirst({
      where: {
        estado: true
      }
    });

    producto = await prisma.producto.findFirst({
      where: {
        estado: true
      }
    });

    expect(proveedor).not.toBeNull();
    expect(producto).not.toBeNull();

    stockOriginal = producto.stock;
  });

  afterAll(async () => {
    if (compraCreadaId) {
      await prisma.$transaction(async (tx) => {
        await tx.detalleCompra.deleteMany({
          where: {
            compraId: compraCreadaId
          }
        });

        await tx.compra.delete({
          where: {
            id: compraCreadaId
          }
        });

        await tx.producto.update({
          where: {
            id: producto.id
          },
          data: {
            stock: stockOriginal
          }
        });
      });
    }

    await prisma.$disconnect();
  });

  test('POST /api/compras debe rechazar una solicitud sin token', async () => {
    const response = await request(app)
      .post('/api/compras')
      .send({
        proveedorId: proveedor.id,
        detalles: [
          {
            productoId: producto.id,
            cantidad: 1,
            precioUnitario: Number(producto.precioCompra)
          }
        ]
      });

    expect(response.statusCode).toBe(401);
  });

  test('POST /api/compras debe registrar una compra autenticada', async () => {
    const response = await request(app)
      .post('/api/compras')
      .set('Authorization', `Bearer ${token}`)
      .send({
        proveedorId: proveedor.id,
        detalles: [
          {
            productoId: producto.id,
            cantidad: 1,
            precioUnitario: Number(producto.precioCompra)
          }
        ]
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.proveedorId).toBe(proveedor.id);
    expect(response.body.data.detalles).toHaveLength(1);

    compraCreadaId = response.body.data.id;
  });

  test('la compra registrada debe incrementar el stock del producto', async () => {
    const productoActualizado = await prisma.producto.findUnique({
      where: {
        id: producto.id
      }
    });

    expect(productoActualizado.stock).toBe(stockOriginal + 1);
  });

  test('GET /api/compras/:id debe devolver la compra registrada', async () => {
    const response = await request(app)
      .get(`/api/compras/${compraCreadaId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(compraCreadaId);
    expect(response.body.data.detalles).toHaveLength(1);
  });
});