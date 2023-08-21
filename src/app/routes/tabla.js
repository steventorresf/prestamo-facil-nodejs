const express = require('express');
const controller = require('../controllers/tabla');
const verifyToken = require('../validators/jwt');
const router = express.Router();

const URI_BASE = '/tabla'
router.post(`${URI_BASE}`, [verifyToken], controller.createTabla);
router.get(`${URI_BASE}/by-codigos/:codigos`, [verifyToken], controller.getTablasByCodigos);

module.exports = router;