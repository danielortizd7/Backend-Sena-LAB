const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/autenticar');
const validarRegistro = require('../middlewares/validarRegistro');
const verificarRol = require('../middlewares/verificarRol');

module.exports = (controller) => {
  router.post('/registro', validarRegistro, controller.registrar.bind(controller));
  router.post('/login', controller.login.bind(controller));
  router.get('/', autenticar, controller.obtenerTodos.bind(controller));
  router.get('/:id', autenticar, controller.obtenerPorId.bind(controller));
  router.put('/:id', autenticar, controller.actualizar.bind(controller));
  router.delete('/:id', autenticar, verificarRol(['administrador', 'super_admin']), controller.eliminar.bind(controller));

  return router;
};