const Agendamento = require('../model/agendamento');
const transporter = require('../services/nodemailer');
const Candidato = require('../model/candidato');

exports.read = (req, res) => {
    const { user_id, grupo, month, year } = req.query;
    Agendamento.read(grupo, user_id, month, year, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data);
    });
};

exports.readCandidatos = (req, res) => {
    const id = req.query.id;
    Agendamento.readCandidatos(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'readCandidatos:', result: result });
        }
    });
}

exports.readAllCandidatos = (req, res) => {
    const id = req.query.id;
    Agendamento.readAllCandidatos(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'readCandidatos:', result: result });
        }
    });
}

exports.update = (req, res) => {
    if (req.body.params) {
        const { id, title, descricao, vaga, candidato, data, hora } = req.body.params;
        Agendamento.update(id, title, descricao, vaga, candidato, data, hora, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else if (result) {
                return res.status(200).json({ sucess: true, result: 'Agendamento Atualizado!' });
            }
        });
    }
}

// Create
exports.create = async (req, res) => {
    const { titulo, descricao, vaga, candidato, empresa, data, horario } = req.body.params;

    let email;
    Candidato.getUser(candidato, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }
        email = usuario.email;   
    });

    const corpo =
        `
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

    Agendamento.create(titulo, descricao, vaga, candidato, empresa, data, horario, (err, insertId) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });

        } if (insertId) {
            console.log(insertId);

            async function main() {
                const info = await transporter.sendMail({
                    from: '"Carreiras" <carreirassenai@gmail.com>',
                    to: email,
                    subject: titulo,
                    html: corpo
                });

                console.log("Email enviado para:", info.accepted);
            }
            main().catch(console.error); // Executa a função

            return res.json({ success: true, userId: insertId });
        }
    });
};


// Create
exports.delete = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    Agendamento.delete(id, (err, insertId) => {
        if (!err) {
            console.log(err.message)
            console.log(err)
            return res.status(500).json({ error: err.message });

        } else {
            return res.status(200).json({ success: true, message: 'Agendamento excluído com sucesso!' });
        }
    });
};