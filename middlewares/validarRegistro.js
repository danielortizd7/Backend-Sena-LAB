const { body, validationResult } = require('express-validator');

const validarRegistro = [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('tipo').isIn(['cliente', 'laboratorista', 'administrador', 'super_admin']).withMessage('Tipo de usuario no válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validarRegistro;