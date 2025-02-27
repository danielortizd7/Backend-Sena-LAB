const Resultado = require("../models/resultadoModel"); // Modelo correcto

const estadosValidos = [
  "Recibida",
  "En análisis",
  "Pendiente de resultados",
  "Finalizada",
  "Rechazada",
];

const cambiarEstadoMuestra = async (cedula, idMuestra, estado) => {
  try {
    // Verificar que el estado sea válido
    if (!estadosValidos.includes(estado)) {
      throw new Error("⚠️ Estado inválido. Los estados permitidos son: " + estadosValidos.join(", "));
    }

    // Buscar la muestra en "Resultado", asegurando que idMuestra sea tratado como string
    const muestra = await Resultado.findOne({ idMuestra: String(idMuestra) });

    if (!muestra) {
      throw new Error("❌ Muestra no encontrada.");
    }

    // Actualizar el estado y la fecha de cambio
    muestra.estado = estado;
    muestra.fechaCambio = new Date();
    muestra.cedulaLaboratorista = cedula; // Registrar quién hizo el cambio

    await muestra.save();

    return muestra;
  } catch (error) {
    console.error("❌ Error al cambiar el estado:", error.message);
    throw new Error(error.message);
  }
};

module.exports = { cambiarEstadoMuestra };
