const categoriaService = require('../services/categoria.service');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.listarCategorias();

    return res.json({
      success: true,
      data: categorias
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al listar categorías'
    });
  }
};

const crearCategoria = async (req, res) => {
  try {
    const categoria = await categoriaService.crearCategoria(req.body);

    return res.status(201).json({
      success: true,
      data: categoria
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const actualizarCategoria = async (req, res) => {
  try {
    const categoria = await categoriaService.actualizarCategoria(
      req.params.id,
      req.body
    );

    return res.json({
      success: true,
      data: categoria
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const eliminarCategoria = async (req, res) => {
  try {
    await categoriaService.eliminarCategoria(req.params.id);

    return res.json({
      success: true,
      message: 'Categoría eliminada correctamente'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};