const Empresa = require('../model/empresa');
const bcrypt = require('bcryptjs');
const { gerarToken } = require('../services/gerarToken');
const transporter = require('../services/nodemailer');

exports.createCompany = async (req, res) => {
    const { razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep,
        numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel,
        contatoRA, senha } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const grupo = 'empresa';

    const token = gerarToken();
    const linkVerificacao = `${process.env.BACKEND_URL}/verifica-conta?grupo=empresa&email=${email}&token=${token}`;
    const corpo = `
        <div style="font-family: Arial, Helvetica, sans-serif; 
            text-align: center; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center;">
            <div style="text-align: center; width: 100%;">
                <hr>
                <h1 style="color: #333;">Carreiras 🐝</h1>
                <div style="background: linear-gradient(to right, #6f00ff, #9341ff);
                    padding: 50px;
                    color: white;
                    box-shadow: 0 1px 4px #333;">
                    <div>
                        <div>Clique no botão para ativar sua conta</div>
                        <br><br>
                        <a target="_blank" href="${linkVerificacao}" style="color: white;
                        box-shadow: 0 1px 4px #333;
                        padding: 10px;
                        text-decoration: none;
                        border-radius: 10px;
                        width: 100px;
                        font-weight: bold;
                        font-size: small;
                        background-color: #6f00ff;">
                            Ativar Conta
                        </a>
                        <br><br><br><br>
                        <small>
                            <a target="_blank" href="https://www.carreiras.com.br" style="color: white;">
                                www.carreiras.com.br
                            </a>
                        </small>
                    </div>
                </div>
                <br>
                <hr>
            </div>
        </div>
    `;

    // Disparar e-mail

    Empresa.createCompany(razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep,
        numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel, contatoRA,
        hashedPassword, grupo, token, (err, insertId) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({ error: err.message });
            }

            if(insertId) {
                async function main() {
                    const info = await transporter.sendMail({
                        from: '"Carreiras" <carreirassenai@gmail.com>',
                        to: email,
                        subject: "Ativação de Conta",
                        html: corpo
                    });
            
                    console.log("Email de validação de conta enviado para:", info.accepted);
                }
                main().catch(console.error);
                
                return res.status(200).json({ success: true, userId: insertId });
            }
        });
}

//Login
exports.login = (req, res) => {
    const { email, password } = req.body;
    Empresa.getLogin(email, (err, user, status) => {
        if (err)
            return res.status(500).json({ error: err.message });
        else if (status)
            return res.status(401).json({ aviso: status });
        else if (user === null)
            return res.status(401).json({ aviso: 'Email ou senha incorretos!' });
        else {
            bcrypt.compare(password, user.senha, (err, isMatch) => {
                if (err)
                    return res.status(500).json({ error: err.message });

                if (isMatch) {
                    req.session.usuario = user;
                    res.json({ success: true, user: user });
                } else
                    res.status(401).json({ aviso: 'Email ou senha incorretos!' });
            })
        }
    })
}

// Read / Autenticar
exports.getUser = (req, res) => {
    let usuario_id = 0;
    if(req.query.id)
        usuario_id = req.query.id;
    else if(req.session.usuario.id)
        usuario_id = req.session.usuario.id;
    else if(req.body.id)
        usuario_id = req.body.id;
    //const usuario_id = req.query.id ? req.query.id : req.session.usuario.id;

    if (usuario_id) {
        Empresa.getUser(usuario_id, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }
            console.log(usuario);

            res.json({ success: true, usuario: usuario });
        });
    }
};

exports.getAllUser = (req, res) => {
    Empresa.getAllUser((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Empresas:', result: result });
        }
    });
};

exports.getAllUser = (req, res) => {
    Empresa.getAllUser((err, usuarios) => {
        if (err)
            return res.status(500).json({ error: err.message });

        if (!usuarios)
            return res.status(404).json({ error: "Usuários não encontrados" })

        res.json({ success: true, usuarios: usuarios })
    })
}

exports.updateUser = (req, res) => {
    const { id, razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep, numero,
        complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel, contatoRA, verificado } = req.body.dados;
    console.log('\n updateUser:');
    console.log(req.body.dados);

    const grupo = 'empresa';

    Empresa.updateUser(razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep,
        numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel, contatoRA, verificado, grupo, id, (err, success) => {
            if (err)
                return res.status(500).json({ error: err.message });

        return res.status(200).json({ success: 'Cadastro Atualizado!' });
    });
}

exports.pesquisaEmpresa = (req, res) => {
    const busca = req.query.busca;
    Empresa.pesquisaEmpresa(busca, (err, result) => {
        if (err) 
            return res.status(500).json({ error: err.message });
        
        if (result.length === 0)             
            return res.status(404).json({ error: 'Busca não encontrada' });
        
        return res.json({ success: true, result: result });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.body;

    Empresa.deleteUser(id, (err, success) => {
        if (err)
            return res.status(500).json({ error: err.message });

        return res.status(200).json({ success: 'Usuário Deletado!' })
    })
}