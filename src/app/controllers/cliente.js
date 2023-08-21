const mongoose = require('mongoose');
const model = require('../models/cliente');
const { tryCatchAsync } = require('../../config/tryCatch');

const parseId = (id) => {
    return new mongoose.Types.ObjectId(id);
}

exports.getClientes = tryCatchAsync(async (req, res) => {
    const filters = {
        'usuarioId': parseId(req.header('uid')),
        'nombreCompleto': { $regex: req.query['text'] || '', $options: 'i' }
    }

    const paginate = {
        page: parseInt(req.query['pageNumber'] || '1'), limit: parseInt(req.query['pageSize'] || '5')
    }

    const result = await model.paginate(filters, paginate);
    return res.status(200).send(result);
})

exports.createCliente = tryCatchAsync(async (req, res) => {
    const data = req.body;
    const result = await model.create(data);
    res.send(result);
})

exports.updateCliente = tryCatchAsync(async (req, res) => {
    const { id } = req.params;
    const data = { ...req.body };
    const result = await model.updateOne({ _id: parseId(id) }, data);
    res.send(result);
})

exports.updateEstadoCliente = tryCatchAsync(async (req, res) => {
    const { id } = req.params;
    const data = { estado: { ...req.body } };
    const result = await model.updateOne({ _id: parseId(id) }, data);
    res.send(result);
})

exports.deleteCliente = tryCatchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await model.deleteOne({ _id: parseId(id) });
    res.send(result);
})