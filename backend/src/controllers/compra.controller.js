const compraService = require('../services/compra.service');

const listarProveedores = async (req, res) => {
  try {
    const proveedores = await compraService.listarProveedores();

    return res.json({
      success: true,
      data: proveedores
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al listar proveedores'
    });
  }
};

const listarProductos = async (req, res) => {
  try {
    const productos = await compraService.listarProductos();

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

const crearCompra = async (req, res) => {
  try {
    const compra = await compraService.crearCompra(req.body);

    return res.status(201).json({
      success: true,
      data: compra
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const listarCompras = async (req, res) => {
  try {
    const compras = await compraService.listarCompras();

    return res.json({
      success: true,
      data: compras
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al listar compras'
    });
  }
};

const obtenerCompraPorId = async (req, res) => {
  try {
    const compra = await compraService.obtenerCompraPorId(req.params.id);

    return res.json({
      success: true,
      data: compra
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  listarProveedores,
  listarProductos,
  crearCompra,
  listarCompras,
  obtenerCompraPorId
};