require('dotenv').config({
  path: '.env.test'
});

const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

describe('Pruebas de integración de autenticación y productos', () => {
  let token;

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
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('POST /api/auth/login debe autenticar al administrador', () => {
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('GET /api/productos debe rechazar solicitudes sin token', async () => {
    const response = await request(app)
      .get('/api/productos');

    expect(response.statusCode).toBe(401);
  });

  test('GET /api/productos debe devolver los productos autenticados', async () => {
    const response = await request(app)
      .get('/api/productos')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});