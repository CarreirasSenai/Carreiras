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
const Experiencia = require('../controller/experiencias');
const Habilidade = require('../controller/habilidades');
const VerificarConta = require('../controller/verificarConta');

// rotas candidato
router.post('/candidato/login', Candidato.login);
router.delete('/candidato/delete', authMiddleware, Candidato.deleteUser);
router.post('/candidato/create', Candidato.createUser);
router.put('/candidato/update', authMiddleware, Candidato.updateUser);
router.get('/candidato/read', authMiddleware, Candidato.getUser);

// rotas perfil
router.put('/perfil/update', authMiddleware, Perfil.perfilUpdate);

// rotas formacoes
router.post('/formacao/create', authMiddleware, Formacao.formacaoCreate);
router.get('/formacao/read', authMiddleware, Formacao.formacaoRead);
router.delete('/formacao/delete/:id', authMiddleware, Formacao.formacaoDelete);
router.put('/formacao/update/', authMiddleware, Formacao.formacaoUpdate);

// rotas cursos
router.post('/curso/create', authMiddleware, Curso.cursoCreate);
router.get('/curso/read', authMiddleware, Curso.cursoRead);
router.delete('/curso/delete/:id', authMiddleware, Curso.cursoDelete);
router.put('/curso/update/', authMiddleware, Curso.cursoUpdate);

// rotas experiencias
router.post('/experiencia/create', authMiddleware, Experiencia.experienciaCreate);
router.get('/experiencia/read', authMiddleware, Experiencia.experienciaRead);
router.delete('/experiencia/delete/:id', authMiddleware, Experiencia.experienciaDelete);
router.put('/experiencia/update/', authMiddleware, Experiencia.experienciaUpdate);

// rotas habilidades
router.post('/habilidade/create', authMiddleware, Habilidade.habilidadeCreate);
router.get('/habilidade/read', authMiddleware, Habilidade.habilidadeRead);
router.delete('/habilidade/delete/:id', authMiddleware, Habilidade.habilidadeDelete);
router.put('/habilidade/update/', authMiddleware, Habilidade.habilidadeUpdate);

// rotas vagas
router.get('/vaga/pesquisa', Vaga.vagaPesquisa);
router.post('/vaga/create', Vaga.vagaCreate);
router.get('/vaga/read', Vaga.vagaRead);
router.get('/vaga/read/all', Vaga.vagaReadAll);
router.put('/vaga/update', Vaga.vagaUpdate);
router.delete('/vaga/delete/:id', Vaga.vagaDelete);

// rotas redefinir senha
router.post('/enviar/codigo', RedefinirSenha.enviarCodigo);
router.post('/validar/codigo', RedefinirSenha.validarCodigo);
router.put('/redefinir/senha', RedefinirSenha.redefinirSenha);

// rota verificar conta
router.get('/verifica-conta', VerificarConta.verificarConta);

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