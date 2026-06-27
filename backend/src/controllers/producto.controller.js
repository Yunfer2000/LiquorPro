const productoService = require('../services/producto.service');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await productoService.listarCategorias();

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

const listarProductos = async (req, res) => {
  try {
    const productos = await productoService.listarProductos();

    return res.json({
      success: true,
      data: productos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al listar productos'
    });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await productoService.obtenerProductoPorId(req.params.id);

    return res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const producto = await productoService.crearProducto(req.body);

    return res.status(201).json({
      success: true,
      data: producto
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const producto = await productoService.actualizarProducto(
      req.params.id,
      req.body
    );

    return res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    await productoService.eliminarProducto(req.params.id);

    return res.json({
      success: true,
      message: 'Producto eliminado correctamente'
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  listarCategorias,
  listarProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};