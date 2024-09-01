const Candidato = require('../model/candidato');
const DataHora = require('../services/dataHora');
const bcrypt = require('bcrypt');

// Create
exports.createUser = async (req, res) => {
    const { nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, password } = req.body;

    // Gerar um salt e hash a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const dataAtu = DataHora.dataHora();
    const profissao = 'indefinida';
    const grupo = 'candidato';

    Candidato.createUser(nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, hashedPassword, profissao, grupo, dataAtu, (err, insertId) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }

        res.json({ success: true, userId: insertId });
    });
};

// Login
// exports.login = (req, res) => {
//     const { email, password } = req.body;

//     Candidato.getLogin(email, password, (err, user) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         if (user === null) {
//             return res.status(401).json({ error: 'Email ou senha incorretos!' });
//         } else {
//             req.session.usuario = user;
//             res.json({ success: true, user: user });
//         }
//     });
// };

exports.login = (req, res) => {
    const { email, password } = req.body;

    Candidato.getLogin(email, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (user === null) {
            return res.status(401).json({ error: 'Email ou senha incorretos!' });
        
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
                    res.status(401).json({ error: 'Email ou senha incorretos!' });
                }
            });
        }
    });
};


// Read / Autenticar
exports.getUser = (req, res) => {

    if (!req.session.usuario) {
        return res.status(401).json({ error: 'Usuário não autenticado!' });
    }

    usuario_id = req.session.usuario.id;

    Candidato.getUser(usuario_id, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        console.log(req.session);
        res.json({ success: true, usuario: usuario });
    });
};

// Update
exports.updateUser = (req, res) => {
    console.log('\n updateUser:');
    console.log(req.body);


    // res.json({ error: true });

    // Candidato.updateUser(id, nome, email, senha, foto, descricao, (success) => {
    //     res.redirect('/editarPerfil');
    // });
};

// Delete
exports.deleteUser = (req, res) => {
    const { id } = req.body;
    Candidato.deleteUser(id, (success) => {
        res.redirect('/');
    });
};
