const mongoose = require("mongoose");

const tablaDetalleSchema = new mongoose.Schema({
    codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { codigo: { type: String, required: true }, descripcion: { type: String, required: true } }
}, { versionKey: false, timestamps: true });

const tablaSchema = new mongoose.Schema({
    codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { codigo: { type: String, required: true }, descripcion: { type: String, required: true } },
    detalles: [tablaDetalleSchema],
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("Tabla", tablaSchema);