const transporter = require('../services/nodemailer');

// No arquivo formulario.js
exports.formularioEnvio = (req, res) => {
  const { email, mensagem } = req.body;

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
                  <div>Mensagem enviada pelo usuário:</div>
                  <br><br>
                  <div><strong>${mensagem}</strong></div>
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
      from: email, // Remetente
      to: "carreirassenai@gmail.com", // Destinátario (change to the company email)
      subject: "Message from " + email, // Título
      html: corpo // Email
    });

    console.log("Message sent:", info.accepted);

    // Envia resposta para o modal
    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  }
  main().catch((error) => {
    console.error(error);
    res.json({ success: false, message: "Erro ao enviar mensagem" });
  });
};