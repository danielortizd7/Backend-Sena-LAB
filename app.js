const express = require('express');
const { connectDB } = require('./config/bdClient');
const usuarioRoutes = require('./routers/usuarioRoutes');
const Usuario = require('./models/Usuario');
const Cliente = require('./models/Cliente');
const Laboratorista = require('./models/Laboratorista');
const Administrador = require('./models/Administrador');
const SuperAdmin = require('./models/SuperAdmin');
const UsuarioController = require('./controllers/usuarioController');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const timeout = require('connect-timeout');

const logging = require('./middlewares/logging');
const manejarErrores = require('./middlewares/manejarErrores');
const autenticar = require('./middlewares/autenticar');
const validarRegistro = require('./middlewares/validarRegistro');
const verificarRol = require('./middlewares/verificarRol');



const cors = require('cors');
const app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(timeout('10s'));
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

app.use(logging);
async function iniciarServidor() {
  const db = await connectDB();
  
  const usuarioModel = new Usuario(db);
  const clienteModel = new Cliente(db);
  const labModel = new Laboratorista(db);
  const adminModel = new Administrador(db);
  const superAdminModel = new SuperAdmin(db);
  
  const usuarioController = new UsuarioController(
    usuarioModel,
    clienteModel,
    labModel,
    adminModel,
    superAdminModel
  );
  
  app.use('/api/usuarios', usuarioRoutes(usuarioController));
  
  app.use(manejarErrores);
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

iniciarServidor().catch(console.error);