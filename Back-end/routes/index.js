const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const path = require('path');
const { json } = require('body-parser');

// Objetos do controller
const Candidato = require('../controller/candidato');
const DataHora = require('../controller/dataHora');

// rotas usuario
router.post('/candidato/login', Candidato.login);
router.post('/candidato/delete', authMiddleware, Candidato.deleteUser);
router.post('/candidato/create', Candidato.createUser);
router.post('/candidato/update', authMiddleware, Candidato.updateUser);
router.get('/candidato/read', authMiddleware, Candidato.getUser);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao destruir a sessão!" });
        }
        res.clearCookie('session-id'); // Limpa o cookie de sessão, se necessário
        res.json({ success: "Logout feito com sucesso!" });
    });
});

module.exports = router;