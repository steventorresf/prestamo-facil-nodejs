const mongoose = require("mongoose");
const mongoosePagination = require('mongoose-paginate-v2');

const clienteSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.ObjectId, ref: "Usuario" },
    identificacion: { codigo: { type: String, required: true }, descripcion: { type: String, required: true }, numero: { type: String, required: true } },
    nombreCompleto: { type: String, required: true },
    genero: { codigo: { type: String, required: true }, descripcion: { type: String, required: true } },
    direccion: { type: String },
    telCel: { type: String },
    estado: { codigo: { type: String, required: true }, descripcion: { type: String, required: true } }
}, { versionKey: false, timestamps: true });

clienteSchema.plugin(mongoosePagination);

module.exports = mongoose.model("Cliente", clienteSchema);