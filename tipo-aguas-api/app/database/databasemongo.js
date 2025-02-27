const mongoose = require('mongoose');
const TipoAgua = require('../models/tipoAgua'); // Asegúrate de importar el modelo

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB Atlas');

        // Verificar si la tabla paramétrica ya tiene datos
        const existeDatos = await TipoAgua.countDocuments();
        if (existeDatos === 0) {
            await TipoAgua.insertMany([
                { _id: "H01", tipoDeAgua: "potable", descripcion: "Agua apta para consumo humano" },
                { _id: "H02", tipoDeAgua: "natural", descripcion: "Agua de origen natural" },
                { _id: "H03", tipoDeAgua: "residual", descripcion: "Agua con contaminantes" },
                { _id: "H04", tipoDeAgua: "otra", descripcion: "Otro tipo de agua" }
            ]);
            console.log('📌 Tipos de agua iniciales insertados');
        }
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;
