const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compra.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/proveedores',
  authMiddleware,
  compraController.listarProveedores
);

router.get(
  '/productos',
  authMiddleware,
  compraController.listarProductos
);

router.get(
  '/',
  authMiddleware,
  compraController.listarCompras
);

router.get(
  '/:id',
  authMiddleware,
  compraController.obtenerCompraPorId
);

router.post(
  '/',
  authMiddleware,
  compraController.crearCompra
);

module.exports = router;