const transporter = require('../services/nodemailer');
const RedefinirSenha = require('../model/redefinirSenha');
const bcrypt = require('bcrypt');

exports.enviarCodigo = (req, res) => {
    // Recebe o email da requisição
    const { email, grupo } = req.body;

    RedefinirSenha.validaUser(email, grupo, (err, dados) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }

        if (dados === null) {
            return res.status(401).json({ error: 'Não há usuário com este e-mail!' });
        } else {

            // Gera código de redefinição de 6 digitos
            var codigo = '';
            for (let i = 0; i < 6; i++) {
                let random;
                random = Math.floor(Math.random() * 10);
                codigo += random.toString();
            }

            // Guarda email e código no objeto 'redefinicao' dentro da sessão
            req.session.redefinicao = {
                email: email,
                codigo: codigo
            }

            // Mensagem do email de redefinição
            const corpo =
                `
            <div style="font-family: Arial, Helvetica, sans-serif;">
                <!-- <img style="width: 200px; margin: 10px;" src="http://localhost:3000/src/assets/logo.png"> -->
                <h1>Carreiras  🐝</h1>
                <strong>Olá, Tudo bem? <br> <br></strong>
                Foi solicitado uma redefinição de senha para este endereço de e-mail. <br> <br>
                O código para redefinição é <strong>${codigo}</strong> <br> <br>
                Caso você não tenha feito a solicitação, desconsidere este e-mail. <br> <br>
                Atenciosamente, Carreiras.<br> <br>
                <small><a href="https://www.carreiras.com.br" target="_blank">www.carreiras.com.br</a></small> <br> <br>
            </div>
            `;

            // Função ASSÍNCRONA!! para disparar email
            async function main() {
                const info = await transporter.sendMail({
                    from: '"Carreiras" <carreirassenai@gmail.com>', // Remetente
                    to: email, // Destinátario
                    subject: "Redefinição de Senha", // Título
                    html: corpo // Email
                });

                console.log("Message sent:", info.accepted);
            }
            main().catch(console.error); // Executa a função

            res.json({ codido: codigo }); // Envia resposta da requisição
        }
    });
}

exports.validarCodigo = (req, res) => {
    const { email, grupo, codigo } = req.body;
    console.log(email);
    console.log(grupo);
    console.log(codigo);

    RedefinirSenha.validaUser(email, grupo, (err, dados) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }

        if (dados === null) {
            return res.status(401).json({ error: 'Não há usuário com este e-mail!' });
        }

        console.log(req.session.redefinicao)

        // Válida o código e o email
        if (email === req.session.redefinicao.email && codigo === req.session.redefinicao.codigo) {
            return res.json({ success: true, dados: dados })
        } else {
            return res.status(404).json({ error: 'Código incorreto!' })
        }
    });
}

exports.redefinirSenha = async (req, res) => {
    const { dados, novaSenha } = req.body;

    // Gerar um salt e hash a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(novaSenha, saltRounds);

    RedefinirSenha.redefinirSenha(dados, hashedPassword, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        } else {
            console.log(result);            
            res.json({ success: true, result: result });
        }
    });
};