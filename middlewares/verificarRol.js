const verificarRol = (rolesPermitidos) => (req, res, next) => {
    const usuario = req.user; 
    if (!rolesPermitidos.includes(usuario.tipo)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
  
  module.exports = verificarRol;