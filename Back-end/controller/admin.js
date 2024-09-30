const Candidato = require('../model/candidato');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../services/gerarToken');
const transporter = require('../services/nodemailer');
const Admin = require('../model/admin');

// Create
exports.createUser = async (req, res) => {
    const { tipo_admin, status, nome, email, cpf, password, celular } = req.body;
    console.log(req.body);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const grupo = 'admin';

    Admin.createUser(tipo_admin, status, nome, email, cpf, hashedPassword, celular, grupo, (err, insertId) => {
        if (err) {
            return res.status(500).json({ error: err.message });

        } if (insertId) {
            return res.json({ success: true, userId: insertId });
        }
    });
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

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

    Candidato.getUser(usuario_id, (err, usuario) => {
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

// async function name() {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash('123456', saltRounds);
//     console.log(hashedPassword);
// }
// name();
