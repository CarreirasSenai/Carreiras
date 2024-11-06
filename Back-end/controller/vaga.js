const Vaga = require("../model/vaga");
const transporter = require('../services/nodemailer');

exports.vagaCreate = (req, res) => {
    const id = req.session.usuario.id;
    const dados = req.body;

    Vaga.vagaCreate(id, dados, (err, idVaga) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (idVaga) {
            return res.status(200).json({ sucess: 'Vaga criada!', idVaga: idVaga });
        }
    });
};

exports.vagaRead = (req, res) => {
    const { id } = req.query;

    Vaga.vagaRead(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Vagas pesquisada:', result: result });
        }
    });
}

exports.vagaReadEmpresa = (req, res) => {
    const id = req.query.id ? req.query.id : req.session.usuario.id;

    Vaga.vagaReadEmpresa(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Vagas empresa:', result: result });
        }
    });
}

exports.vagaReadAll = (req, res) => {
    Vaga.vagaReadAll((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Vagas empresa:', result: result });
        }
    });
}

exports.vagaUpdate = (req, res) => {
    const dados = req.body;

    Vaga.vagaUpdate(dados, (err, idVaga) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (idVaga) {
            return res.status(200).json({ sucess: 'Vaga atualizada!', idVaga: idVaga });
        }
    });
};

exports.vagaDelete = (req, res) => {
    const { id } = req.params;

    Vaga.vagaDelete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!result) {
            return res.status(404).json({ error: "Recurso não encontrado" });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
};

// vagas pesquisadas e filtradas
exports.vagaPesquisa = (req, res) => {
    const { dados } = req.query;

    Vaga.vagaPesquisa(dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Vagas pesquisa:', result: result });
        }
    });
};

exports.vagaUpdateStatus = (req, res) => {
    const { id_vaga, id_empresa, opcaoSelecionada, mensagem, titulo, email } = req.body;

    const mensagemEmail = mensagem ? mensagem : 'Sua vaga foi aprovada. Ela está já disponível para que os candidatos possam inscrever-se!'; 

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
                        <h2 style:"text-align: center;">Título da vaga: ${titulo}</h2>
                        <br><br>
                        <p>${mensagemEmail}</p>
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

    Vaga.vagaUpdateStatus(id_vaga, id_empresa, opcaoSelecionada, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });

        if (result){
            async function main() {
                const info = await transporter.sendMail({
                    from: '"Carreiras" <carreirassenai@gmail.com>',
                    to: email,
                    subject: "Ativação de Conta",
                    html: corpo
                });
            }
            main().catch(console.error);
            return res.status(200).json({ success: true, result: result });
        }
    })
}