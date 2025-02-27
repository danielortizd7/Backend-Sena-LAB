const mongoose = require("mongoose");

const estadosValidos = ["Recibida", "En análisis", "Pendiente de resultados", "Finalizada", "Rechazada"];

const MuestraSchema = new mongoose.Schema({
  idMuestra: { type: String, required: true, unique: true },
  estado: { type: String, enum: estadosValidos, default: "Recibida" },
  fechaCambio: { type: Date, default: Date.now },
  cedulaLaboratorista: { type: String, required: true }
});

module.exports = mongoose.model("Muestra", MuestraSchema);
