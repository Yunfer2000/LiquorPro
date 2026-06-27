const clienteService = require('../services/cliente.service');

const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteService.listarClientes();

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

const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await clienteService.obtenerClientePorId(req.params.id);

    return res.json({
      success: true,
      data: cliente
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

const crearCliente = async (req, res) => {
  try {
    const cliente = await clienteService.crearCliente(req.body);

    return res.status(201).json({
      success: true,
      data: cliente
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const cliente = await clienteService.actualizarCliente(
      req.params.id,
      req.body
    );

    return res.json({
      success: true,
      data: cliente
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    await clienteService.eliminarCliente(req.params.id);

    return res.json({
      success: true,
      message: 'Cliente eliminado correctamente'
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
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};