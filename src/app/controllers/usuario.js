const model = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { tryCatchAsync } = require('../../config/tryCatch');

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const EXPIRES_IN = process.env.EXPIRES_IN;
const CLAVE_DEFAULT = process.env.CLAVE_DEFAULT;

exports.createUsuario = tryCatchAsync(async (req, res) => {
    const SALT = await bcrypt.genSalt(10);
    const data = { ...req.body, clave: await bcrypt.hash(CLAVE_DEFAULT, SALT) };
    const response = await model.create(data);
    res.send({
        _id: response._id,
        nombreUsuario: response.nombreUsuario,
        nombreCompleto: response.nombreCompleto,
        estado: response.estado
    });
})

exports.login = tryCatchAsync(async (req, res) => {
    const USER = await model.findOne({ nombreUsuario: { $regex: new RegExp("^" + req.body.username + "$", "i") } });
    if (!USER || !(await bcrypt.compare(req.body.password, USER.clave)))
        return res.status(404).send({
            title: '¡Usuario no valido!',
            message: 'Usuario y/o contraseña incorrectos'
        });

    const data = {
        uid: USER._id.toString(),
        nombreUsuario: USER.nombreUsuario,
        nombreCompleto: USER.nombreCompleto
    };
    const TOKEN = jwt.sign(data, TOKEN_SECRET, { expiresIn: EXPIRES_IN })
    res.send({ ...data, token: TOKEN });
})