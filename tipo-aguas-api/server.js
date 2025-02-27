const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tipoAguaRoutes = require('./app/routes/tipoAguaRoutes');
const conectarDB = require('./app/database/databasemongo');

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json()); 

conectarDB(); 

// ✅ Rutas correctamente definidas
app.use('/api/tipoAgua', tipoAguaRoutes);

// ✅ Ruta de prueba
app.get('/', (req, res) => {
    res.send("Bienvenido a la API de Tipos de Agua 🌊");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
