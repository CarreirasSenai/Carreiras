const Candidato = require('../model/candidato');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../services/gerarToken');
const transporter = require('../services/nodemailer');

// Create
exports.createUser = async (req, res) => {
    const { nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, password, area, profissao } = req.body;

    // Gerar um salt e hash a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const grupo = 'candidato';

    const token = gerarToken(); // Gera o token
    const linkVerificacao = `${process.env.BACKEND_URL}/verifica-conta?grupo=candidato&email=${email}&token=${token}`;
    const corpo =
        `
            <div style="font-family: Arial, Helvetica, sans-serif;">
                <h1>Carreiras  🐝</h1> <br>
                Clique no link para ativar sua conta: <a target="_blank" href="${linkVerificacao}">clique aqui.</a> <br> <br>
                <small><a href="https://www.carreiras.com.br" target="_blank">www.carreiras.com.br</a></small> <br> <br>
            </div>
    `;

    // Disparar e-mail
    async function main() {
        const info = await transporter.sendMail({
            from: '"Carreiras" <carreirassenai@gmail.com>',
            to: email,
            subject: "Ativação de Conta",
            html: corpo
        });

        console.log("Email de validação de conta enviado para:", info.accepted);
    }
    main().catch(console.error); // Executa a função

    Candidato.createUser(nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, hashedPassword, area, profissao, grupo, token, (err, insertId) => {
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

    // console.log(email, password);

    Candidato.getLogin(email, (err, user, status) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (status) {
            return res.status(401).json({ aviso: status });
        } else if (user === null) {
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

    usuario_id = req.session.usuario.id;

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

// Update
exports.updateUser = (req, res) => {
    const { id, nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, area, profissao } = req.body;
    console.log('\n updateUser:');
    console.log(req.body);

    const grupo = 'candidato';

    Candidato.updateUser(nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, area, profissao, grupo, id, (err, success) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(200).json({ success: 'Cadastro Atualizado!' });
    });
};

// Delete
exports.deleteUser = (req, res) => {
    const { id } = req.body;
    console.log(id);

    Candidato.deleteUser(id, (err, success) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ success: 'Usuário Deletado!' });
    });
};
