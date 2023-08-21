const mongoose = require("mongoose");
const mongoosePagination = require('mongoose-paginate-v2');

const usuarioSchema = new mongoose.Schema({
    nombreCompleto: { type: String, required: true },
    nombreUsuario: { type: String, unique: true, required: true },
    clave: { type: String, required: true },
    estado: { codigo: { type: String, required: true }, descripcion: { type: String, required: true } }
}, { versionKey: false, timestamps: true });

usuarioSchema.plugin(mongoosePagination);

module.exports = mongoose.model("Usuario", usuarioSchema);