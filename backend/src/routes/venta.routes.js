const express = require('express');
const router = express.Router();

const ventaController = require('../controllers/venta.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/clientes', authMiddleware, ventaController.listarClientes);

router.get('/productos', authMiddleware, ventaController.listarProductos);

router.get('/', authMiddleware, ventaController.listarVentas);

router.get('/:id', authMiddleware, ventaController.obtenerVentaPorId);

router.post('/', authMiddleware, ventaController.crearVenta);

module.exports = router;