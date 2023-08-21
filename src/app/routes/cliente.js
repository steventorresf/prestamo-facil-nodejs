const express = require('express');
const controller = require('../controllers/cliente');
const router = express.Router();
const verifyToken = require('../validators/jwt');
const validator = require('../validators/cliente');

const URI_BASE = '/cliente';
router.get(`${URI_BASE}`, [verifyToken], controller.getClientes);
router.post(`${URI_BASE}`, [verifyToken], controller.createCliente);
router.put(`${URI_BASE}/:id`, [verifyToken], controller.updateCliente);
router.put(`${URI_BASE}/estado/:id`, [verifyToken], controller.updateEstadoCliente);
router.delete(`${URI_BASE}/:id`, [verifyToken], controller.deleteCliente);

module.exports = router;