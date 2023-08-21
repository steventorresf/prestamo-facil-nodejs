const model = require('../models/tabla');
const { tryCatchAsync } = require('../../config/tryCatch');
const ESTADO = 'AC';

exports.getTablasByCodigos = tryCatchAsync(async (req, res) => {
    const { codigos } = req.params;
    const filters = {
        'codigo': { $in: codigos.split(',') }
    }
    const response = await model.find(filters);
    res.send(response);
})

exports.createTabla = tryCatchAsync(async (req, res) => {
    const data = req.body;
    const response = await model.create(data)
        .catch((err) => {
            return res.send(err);
        });
    res.send(response);
})