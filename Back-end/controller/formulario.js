const transporter = require('../services/nodemailer');

//Formulario criado para enviar a mgm do usuario: não terminado
exports.formularioEnvio = (req, res) => {
    // Recebe o email da requisição
    const { email, mensagem } = req.body;

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
                            <div>Aqui está a Mensagem enviada pelo</div>
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

    res.json({ sucess: true }); // Envia resposta da requisição
};