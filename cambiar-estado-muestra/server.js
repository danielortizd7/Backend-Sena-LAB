const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./app/database/databasemongo");
const muestraRoutes = require("./app/routes/muestraRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/muestras", muestraRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
