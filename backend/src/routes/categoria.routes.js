const express = require('express');
const categoriaController = require('../controllers/categoria.controller');
const verificarToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(verificarToken);

router.get('/', categoriaController.listarCategorias);
router.post('/', categoriaController.crearCategoria);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;