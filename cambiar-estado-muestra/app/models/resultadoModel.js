const mongoose = require("mongoose");

const estadosValidos = ["Recibida", "En análisis", "Pendiente de resultados", "Finalizada", "Rechazada"];

const ResultadoSchema = new mongoose.Schema({
  idMuestra: { type: String, required: true, unique: true },
  pH: Number,
  turbidez: Number,
  oxigenoDisuelto: Number,
  nitratos: Number,
  fosfatos: Number,
  cedulaLaboratorista: { type: String, required: true },
  nombreLaboratorista: { type: String, required: true },
  fechaAnalisis: { type: Date, default: Date.now },
  estado: { type: String, enum: estadosValidos, default: "Recibida" }, // 📌 Agregado
  fechaCambio: { type: Date, default: Date.now } // 📌 Agregado
});

module.exports = mongoose.model("Resultado", ResultadoSchema);
