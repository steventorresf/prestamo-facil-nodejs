const express = require('express');
const controller = require('../controllers/usuario');
const router = express.Router();

const URI_BASE = '/usuario'
router.post(`${URI_BASE}`, controller.createUsuario);
router.post(`${URI_BASE}/login`, controller.login);

module.exports = router;