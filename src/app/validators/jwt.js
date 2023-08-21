const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const parseId = (id) => {
    return new mongoose.Types.ObjectId(id);
}

const isObjectValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

const verifyJwt = async (req, res, next) => {
    const TOKEN = req.header('Authorization');
    if (!TOKEN)
        return res.status(401).send({
            title: '¡Usuario no valido!',
            message: 'El token es obligatorio, por favor inicie sesión'
        });

    if (!TOKEN.includes('Bearer '))
        return res.status(401).send({
            title: '¡Usuario no valido!',
            message: 'El token es invalido'
        });

    try {
        await jwt.verify(TOKEN.replace('Bearer ', ''), TOKEN_SECRET);
    }
    catch (e) {
        return res.status(401).send({
            title: '¡Sesión expirada!',
            message: 'Su sesión ha caducado, por favor inicie sesión.'
        });
    }

    const UID = req.header('uid');
    if (!UID)
        return res.status(401).send({
            title: '¡Usuario no valido!',
            message: 'Por algún motivo, no podemos encontrar el ID del usuario, por favor inicie sesión nuevamente'
        });

    if (!isObjectValid(UID) || UID != parseId(UID).toString())
        return res.status(401).send({
            title: '¡Usuario no valido!',
            message: 'El ID del usuario es invalido, por favor inicie sesión nuevamente'
        });

    next();
}
module.exports = verifyJwt;