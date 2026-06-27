const authService = require('../services/auth.service');

const login = async (req, res) => {
  try {
    const resultado = await authService.login(req.body);

    return res.json({
      success: true,
      data: resultado
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

const me = async (req, res) => {
  try {
    const perfil = await authService.getPerfil(req.usuario.id);

    return res.json({
      success: true,
      data: perfil
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener perfil'
    });
  }
};

module.exports = {
  login,
  me
};