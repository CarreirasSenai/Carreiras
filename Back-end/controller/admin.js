const Candidato = require('../model/candidato');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../services/gerarToken');
const transporter = require('../services/nodemailer');
const Admin = require('../model/admin');

// Create
exports.createUser = async (req, res) => {
    const { nome, email, cpf, senha, celular, tipo, status } = req.body.dados;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const grupo = 'admin';

    Admin.createUser(nome, email, cpf, hashedPassword, celular, tipo, status, grupo, (err, insertId) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });

        } if (insertId) {
            console.log(insertId);
            return res.json({ success: true, userId: insertId });
        }
    });
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    Admin.getLogin(email, (err, user, status) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (status) {
            return res.status(401).json({ aviso: status });
        } else if (user === null) {
            return res.status(401).json({ aviso: 'Email ou senha incorretos!' });
        } else {
            // Comparar a senha fornecida com o hash armazenado
            bcrypt.compare(password, user.senha, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (isMatch) {
                    req.session.usuario = user;
                    res.json({ success: true, user: user });
                } else {
                    res.status(401).json({ aviso: 'Email ou senha incorretos!' });
                }
            });
        }
    });
};

// Read / Autenticar
exports.getUser = (req, res) => {
    const usuario_id = req.session.usuario.id;

    Admin.getUser(usuario_id, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        // console.log(req.session);
        res.json({ success: true, usuario: usuario });
    });
};

exports.getAllUser = (req, res) => {
    Admin.getAllUser((err, usuarios) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!usuarios) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        // console.log(req.session);
        res.json({ success: true, usuarios: usuarios });
    });
};

// Update
exports.updateUser = (req, res) => {
    const { id, nome, email, cpf, celular, tipo, status } = req.body.dados;
    console.log('\n updateUser:');

    const grupo = 'admin';

    Admin.updateUser(id, nome, email, cpf, celular, tipo, status, (err, success) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(200).json({ success: 'Cadastro Atualizado!' });
    });
};

// Delete
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    Admin.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!result) {
            return res.status(404).json({ error: "Recurso não encontrado" });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
};

exports.pesquisaUser = (req, res) => {
    const busca = req.query.busca;

    Admin.pesquisaUser(busca, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            console.log('Busca não encontrada');            
            return res.status(404).json({ error: 'Busca não encontrada' });
        }

        return res.json({ success: true, result: result });
    });
};
