const nodemailer = require("nodemailer");

// Configuração do disparador de e-mails
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "carreirassenai@gmail.com",
        pass: "guze ddfq pbwn fqfd",
    },
});

module.exports = transporter;