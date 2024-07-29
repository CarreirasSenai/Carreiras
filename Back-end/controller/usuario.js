const Users = require('../model/usuario');
const DataHora = require('../controller/dataHora');

// Create
exports.createUser = (req, res) => {
    const { nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, password } = req.body;

    const dataAtu = DataHora.dataHora();
    const profissao = 'indefinida';
    const grupo = 'candidato';

    Users.createUser(nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, password, profissao, grupo, dataAtu, (err, insertId) => {
        if (err) {
            // Se houver um erro, retornar o status 500 (erro interno do servidor) e uma mensagem de erro
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }

        // Se a inserção for bem-sucedida, retornar o ID do novo registro
        res.json({ success: true, userId: insertId });
    });
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    Users.getLogin(email, password, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (user === null) {
            return res.status(401).json({ error: 'Email ou senha incorretos!' });
        } else {
            req.session.usuario = user;
            res.json({ success: true, user: user });
        }
    });
};


// Read / Autenticar
exports.getUser = (req, res) => {

    if (!req.session.usuario) {
        return res.status(401).json({ error: 'Usuário não autenticado!' });
    }

    usuario_id = req.session.usuario.id;

    Users.getUser(usuario_id, (err, usuario) => {
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

// Logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao destruir a sessão!" });
        }
        res.clearCookie('session-id'); // Limpa o cookie de sessão, se necessário
        res.json({ success: "Logout feito com sucesso!" });
    });
};

// Update
exports.updateUser = (id, nome, email, senha, foto, descricao, res) => {
    console.log('\n updateUser:');
    console.log(id, nome, email, senha, foto, descricao);

    Users.updateUser(id, nome, email, senha, foto, descricao, (success) => {
        res.redirect('/editarPerfil');
    });
};

// Delete
exports.deleteUser = (req, res) => {
    const { id } = req.body;
    Users.deleteUser(id, (success) => {
        res.redirect('/');
    });
};
