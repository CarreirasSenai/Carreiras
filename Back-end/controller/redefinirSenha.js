const transporter = require('../services/nodemailer');
const RedefinirSenha = require('../model/redefinirSenha');
const bcrypt = require('bcryptjs');

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
                <div style="font-family: Arial, Helvetica, sans-serif; 
                    text-align: center; 
                    display: flex; 
                    flex-direction: column; 
                    justify-content: center; 
                    align-items: center;">
                    <div style="text-align: center;
                    width: 100%;">
                        <hr>
                        <h1 style="color: #333;">Carreiras 🐝</h1>
                        <div style="background: linear-gradient(to right, #6f00ff, #9341ff);
                            padding: 50px;
                            color: white;
                            box-shadow: 0 1px 4px #333;">
                            <div>Foi solicitado uma redefinição de senha para este endereço de e-mail.</div>
                            <br><br>
                            <div>O código para redefinição é</div>
                            <strong>${codigo}</strong>
                            <br><br><br>
                            <div>Caso você não tenha feito a solicitação, desconsidere este e-mail.</div>
                            <br><br>
                            <div>
                                Atenciosamente, Carreiras. <br>
                                <small><a href="https://www.carreiras.com.br" target="_blank"
                                        style="color: white;">www.carreiras.com.br</a></small>
                            </div>
                        </div>
                        <br>
                        <hr>
                    </div>
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