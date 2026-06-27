const express = require('express');
const router = express.Router();

const productoController = require('../controllers/producto.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/categorias',
  authMiddleware,
  productoController.listarCategorias
);

router.get(
  '/',
  authMiddleware,
  productoController.listarProductos
);

router.post(
  '/',
  authMiddleware,
  productoController.crearProducto
);

module.exports = router;