const express = require("express");
const dotenv = require("dotenv");
const conectarDB = require("./app/database/databasemongo");
const resultadoRoutes = require("./app/routes/resultadoRoutes");
const cors = require("cors");

// 🔹 Cargar variables de entorno
dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI no está definido en .env");
  process.exit(1);
}

// 🔹 Conectar a la base de datos
conectarDB()
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => {
    console.error("❌ No se pudo conectar a MongoDB:", error);
    process.exit(1);
  });

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔹 Ruta raíz para evitar "Cannot GET /"
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente!");
});

// 🔹 Rutas principales
app.use("/api", resultadoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
