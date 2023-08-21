require('dotenv').config();
const express = require("express");
const cors = require('cors');
const initDB = require('./src/config/db');
const routeCliente = require('./src/app/routes/cliente');
const routeUsuario = require('./src/app/routes/usuario');
const routeTabla = require('./src/app/routes/tabla');
const app = express();

const corsOption = {
    origin: '*'
}

app.use(cors())
app.use(express.json());
app.use([routeCliente, routeUsuario, routeTabla]);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Ejecutando en puerto ${PORT}`));

initDB();