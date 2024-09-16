const VerificarConta = require("../model/verificarConta");

exports.verificarConta = (req, res) => {
    const grupo = req.query.grupo;
    const email = req.query.email;
    const token = req.query.token;
    console.log(grupo);
    console.log(email);
    console.log(token);

    const html =
        `
    <body style="font-family: Arial, Helvetica, sans-serif;
text-align: center;
color: white; display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;">
    <h1 style="color: #333;">🐝 Carreiras 🐝</h1>
    <div style="width: 100%;
    min-width: 200px;
    max-width: 600px;
    height: 300px;
    padding: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 1px 4px #333;
    background-color: #6832D2;
    text-align: center;
    border-radius: 15px;">
        <h2 style="margin: 0;">Sua conta está verificada ✅</h2>
        <p>Parabéns seu Abelhudo!</p>
        <a href="${process.env.FRONTEND_URL}/login?resposta=${grupo}" style="margin-top: 30px; color: white;">Entrar na Conta</a>
    </div>
</body>
    `;

    VerificarConta.verificarConta(grupo, email, token, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(html);
        }
    });
};
