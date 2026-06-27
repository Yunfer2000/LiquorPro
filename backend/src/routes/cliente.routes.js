const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/cliente.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, clienteController.listarClientes);

router.get('/:id', authMiddleware, clienteController.obtenerClientePorId);

router.post('/', authMiddleware, clienteController.crearCliente);

router.put('/:id', authMiddleware, clienteController.actualizarCliente);

router.delete('/:id', authMiddleware, clienteController.eliminarCliente);

module.exports = router;