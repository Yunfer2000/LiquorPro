const proveedorService = require('../services/proveedor.service');

const listarProveedores = async (req, res) => {
  try {
    const proveedores = await proveedorService.listarProveedores();

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

const obtenerProveedorPorId = async (req, res) => {
  try {
    const proveedor = await proveedorService.obtenerProveedorPorId(req.params.id);

    return res.json({
      success: true,
      data: proveedor
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

const crearProveedor = async (req, res) => {
  try {
    const proveedor = await proveedorService.crearProveedor(req.body);

    return res.status(201).json({
      success: true,
      data: proveedor
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const actualizarProveedor = async (req, res) => {
  try {
    const proveedor = await proveedorService.actualizarProveedor(
      req.params.id,
      req.body
    );

    return res.json({
      success: true,
      data: proveedor
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    await proveedorService.eliminarProveedor(req.params.id);

    return res.json({
      success: true,
      message: 'Proveedor eliminado correctamente'
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
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
};