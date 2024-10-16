const transporter = require('../services/nodemailer');

// No arquivo formulario.js
exports.formularioEnvio = (req, res) => {
  const { email, mensagem } = req.body;

  const corpo = `
  <div style="font-family: Arial, Helvetica, sans-serif;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;">
    <div style="text-align: center;
                width: 100%;
                padding: 20px;
                background-color: #f7f7f7;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 1px 4px #333;">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">Carreiras 🐝</h1>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
      <div style="background: linear-gradient(to right, #6f00ff, #9341ff);
                  padding: 20px;
                  color: white;
                  border-radius: 10px;
                  box-shadow: 0 1px 4px #333;">
        <h2 style="font-size: 18px; margin-bottom: 10px;">Mensagem enviada pelo usuário: </h2>
        <div style="color:#ffffff;">${email}</div
        <p style="font-size: 16px; margin-bottom: 20px;"><strong>${mensagem}</strong></p>
        <p style="font-size: 14px; color: #ccc; margin-bottom: 20px;">Caso você não tenha feito a solicitação, desconsidere este e-mail.</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <p style="font-size: 14px; margin-bottom: 10px;">Atenciosamente, Carreiras.</p>
        <p style="font-size: 12px; margin-bottom: 20px;"><a href="https://www.carreiras.com.br" target="_blank" style="color: #333;">www.carreiras.com.br</a></p>
      </div>
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