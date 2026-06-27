const express = require('express');
const router = express.Router();

const proveedorController = require('../controllers/proveedor.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/',
  authMiddleware,
  proveedorController.listarProveedores
);

router.get(
  '/:id',
  authMiddleware,
  proveedorController.obtenerProveedorPorId
);

router.post(
  '/',
  authMiddleware,
  proveedorController.crearProveedor
);

router.put(
  '/:id',
  authMiddleware,
  proveedorController.actualizarProveedor
);

router.delete(
  '/:id',
  authMiddleware,
  proveedorController.eliminarProveedor
);

module.exports = router;