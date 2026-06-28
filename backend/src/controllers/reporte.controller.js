const reporteService = require('../services/reporte.service');

const reporteVentas = async (req, res) => {
  try {
    const ventas = await reporteService.reporteVentas();

    return res.json({
      success: true,
      data: ventas
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al generar el reporte de ventas'
    });
  }
};

const reporteCompras = async (req, res) => {
  try {
    const compras = await reporteService.reporteCompras();

    return res.json({
      success: true,
      data: compras
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al generar el reporte de compras'
    });
  }
};

const reporteInventario = async (req, res) => {
  try {
    const inventario = await reporteService.reporteInventario();

    return res.json({
      success: true,
      data: inventario
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al generar el reporte de inventario'
    });
  }
};

module.exports = {
  reporteVentas,
  reporteCompras,
  reporteInventario
};