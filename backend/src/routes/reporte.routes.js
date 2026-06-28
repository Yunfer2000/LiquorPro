const express = require('express');
const router = express.Router();

const reporteController = require('../controllers/reporte.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/ventas', authMiddleware, reporteController.reporteVentas);

router.get('/compras', authMiddleware, reporteController.reporteCompras);

router.get('/inventario', authMiddleware, reporteController.reporteInventario);

module.exports = router;