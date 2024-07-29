const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const path = require('path');
const { json } = require('body-parser');

// Objetos do controller
const User = require('../controller/usuario');
const DataHora = require('../controller/dataHora');

// rotas usuario
router.post('/user/login', User.login);
router.post('/user/delete', authMiddleware, User.deleteUser);
router.post('/user/create', User.createUser);
router.post('/user/update', authMiddleware, User.updateUser);
router.get('/user/read', authMiddleware, User.getUser);
router.get('/user/logout', User.logout);

module.exports = router;