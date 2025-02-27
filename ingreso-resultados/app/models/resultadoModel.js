const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema(
  {
    idMuestra: { type: String, required: true, unique: true },
    pH: { type: Number, required: true },
    turbidez: { type: Number, required: true },
    oxigenoDisuelto: { type: Number, required: true },
    nitratos: { type: Number, required: true },
    fosfatos: { type: Number, required: true },
    cedulaLaboratorista: { type: String, required: true },
    nombreLaboratorista: { type: String, required: true },
    fechaAnalisis: { type: Date, default: Date.now },  // ✅ Agregado correctamente
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resultado", resultadoSchema);
