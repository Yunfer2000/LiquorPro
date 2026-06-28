const ventaService = require('../services/venta.service');

const listarClientes = async (req, res) => {
  try {
    const clientes = await ventaService.listarClientes();

    return res.json({
      success: true,
      data: clientes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al listar clientes'
    });
  }
};

const listarProductos = async (req, res) => {
  try {
    const productos = await ventaService.listarProductos();

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

const crearVenta = async (req, res) => {
  try {
    const venta = await ventaService.crearVenta(req.body);

    return res.status(201).json({
      success: true,
      data: venta
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const listarVentas = async (req, res) => {
  try {
    const ventas = await ventaService.listarVentas();

    return res.json({
      success: true,
      data: ventas
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al listar ventas'
    });
  }
};

const obtenerVentaPorId = async (req, res) => {
  try {
    const venta = await ventaService.obtenerVentaPorId(req.params.id);

    return res.json({
      success: true,
      data: venta
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  listarClientes,
  listarProductos,
  crearVenta,
  listarVentas,
  obtenerVentaPorId
};