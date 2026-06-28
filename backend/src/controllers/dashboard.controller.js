const dashboardService = require('../services/dashboard.service');

const obtenerResumen = async (req, res) => {
  try {
    const resumen = await dashboardService.obtenerResumen();

    return res.json({
      success: true,
      data: resumen
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener resumen del dashboard'
    });
  }
};

module.exports = {
  obtenerResumen
};