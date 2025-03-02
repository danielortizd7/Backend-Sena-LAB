import Muestra from '../models/Muestra.js';

// 1️ Obtiene todas las muestras con filtros
export const obtenerMuestras = async (req, res) => {
    try {
        let filtros = {};

        if (req.query.documento) filtros.documento = req.query.documento;  //  Cambio aquí
        if (req.query.id_muestra) filtros.id_muestra = req.query.id_muestra;
        if (req.query.tipoMuestreo) filtros.tipoMuestreo = req.query.tipoMuestreo;  //  Cambio aquí

        if (req.query.analisisSeleccionados) {  //  Cambio aquí
            filtros.analisisSeleccionados = { $in: [req.query.analisisSeleccionados] };
        }

        if (req.query.fechaInicio && req.query.fechaFin) {  // Cambio aquí
            filtros.fechaHora = { 
                $gte: new Date(req.query.fechaInicio),  //  Cambio de fecha_hora → fechaHora
                $lte: new Date(req.query.fechaFin) 
            };
        }

        const muestras = await Muestra.find(filtros).sort({ fechaHora: -1 });  //  Cambio aquí
        res.status(200).json(muestras);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener muestras", error: err.message });
    }
};

// 2️ Registrar una nueva muestra
export const registrarMuestra = async (req, res) => {
    try {
        const nuevaMuestra = new Muestra(req.body);
        await nuevaMuestra.save();
        res.status(201).json({ mensaje: "Muestra registrada exitosamente", data: nuevaMuestra });
    } catch (err) {
        res.status(400).json({ mensaje: "Error al registrar muestra", error: err.message });
    }
};

export const obtenerMuestraPorId = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID de la URL
        const muestra = await Muestra.findById(id); // Busca por `_id`

        if (!muestra) {
            return res.status(404).json({ mensaje: "Muestra no encontrada" });
        }

        res.status(200).json(muestra);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la muestra", error: error.message });
    }
};



export const actualizarMuestra = async (req, res) => {
    try {
        const { id } = req.params;
        const muestraActualizada = await Muestra.findByIdAndUpdate(id, req.body, { new: true });

        if (!muestraActualizada) {
            return res.status(404).json({ mensaje: "Muestra no encontrada" });
        }

        res.json({ mensaje: "Muestra actualizada exitosamente", data: muestraActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la muestra", error: error.message });
    }
};

export const eliminarMuestra = async (req, res) => {
    try {
        const { id } = req.params;
        const muestraEliminada = await Muestra.findByIdAndDelete(id);

        if (!muestraEliminada) {
            return res.status(404).json({ mensaje: "Muestra no encontrada" });
        }

        res.json({ mensaje: "Muestra eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la muestra", error: error.message });
    }
};

