const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const path = require('path');
const { json } = require('body-parser');

// Objetos
const DataHora = require('../services/dataHora');
const Candidato = require('../controller/candidato');
const Vaga = require('../controller/vaga');
const RedefinirSenha = require('../controller/redefinirSenha');
const Formacao = require('../controller/formacoes');
const Curso = require('../controller/cursos');
const Perfil = require('../controller/perfil');

// rotas candidato
router.post('/candidato/login', Candidato.login);
router.delete('/candidato/delete', authMiddleware, Candidato.deleteUser);
router.post('/candidato/create', Candidato.createUser);
router.put('/candidato/update', authMiddleware, Candidato.updateUser);
router.get('/candidato/read', authMiddleware, Candidato.getUser);

// rotas formacoes
router.post('/formacao/create', authMiddleware, Formacao.formacaoCreate);
router.get('/formacao/read', authMiddleware, Formacao.formacaoRead);
router.delete('/formacao/delete/:id', authMiddleware, Formacao.formacaoDelete);
router.put('/formacao/update/', authMiddleware, Formacao.formacaoUpdate);

// rotas cursos
router.post('/curso/create',  Curso.cursoCreate);
router.get('/curso/read',  Curso.cursoRead);
router.delete('/curso/delete/:id',  Curso.cursoDelete);
router.put('/curso/update/',  Curso.cursoUpdate);

// rotas perfil
router.post('/perfil/create',  Perfil.createPerfil);

// rotas vagas
router.get('/vaga/pesquisa', Vaga.buscarVaga);

// rotas redefinir senha
router.post('/enviar/codigo', RedefinirSenha.enviarCodigo);
router.post('/validar/codigo', RedefinirSenha.validarCodigo);
router.put('/redefinir/senha', RedefinirSenha.redefinirSenha);

// rota logout
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