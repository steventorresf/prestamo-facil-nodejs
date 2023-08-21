const mongoose = require('mongoose');

const CONEXION = process.env.CONEXION;

module.exports = () => {
    const connect = () => {
        mongoose.connect(CONEXION, { keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Conexión a BD exitosa');
            })
            .catch(() => {
                console.log('Error conexión BD');
            })
    }
    connect();
}