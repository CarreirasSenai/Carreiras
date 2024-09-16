const transporter = require('./nodemailer');

const codigo = 123456;
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

async function main() {
    const info = await transporter.sendMail({
        from: '"Carreiras" <carreirassenai@gmail.com>',
        to: 'mauesckt@gmail.com',
        subject: "Redefinição de Senha",
        html: corpo
    });

    console.log("Message sent:", info.accepted);
}
main().catch(console.error);