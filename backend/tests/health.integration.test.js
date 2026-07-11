const request = require('supertest');
const app = require('../src/app');

describe('Prueba de integración de la API LiquorPro', () => {
  test('GET /api/health debe responder correctamente', async () => {
    const response = await request(app)
      .get('/api/health');

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      status: 'ok',
      message: 'LiquorPro API funcionando correctamente'
    });
  });
});