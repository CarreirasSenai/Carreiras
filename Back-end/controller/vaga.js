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

exports.getCidadesVagas = (req, res) => {
    Vaga.getCidadesVagas((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Cidades:', result: result });
        }
    });
};

exports.vagaUpdateStatus = (req, res) => {
    const { id_vaga, id_empresa, opcaoSelecionada, mensagem, titulo, email } = req.body;

    const mensagemEmail = mensagem !== null && mensagem !== '' ? mensagem : 'Sua vaga foi aprovada.<br style="color: #fff"> Ela está já disponível para que os candidatos possam inscrever-se!'; 

    const corpo =`
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
          <h2 style="color:#ffffff; font-size: 30px; margin-bottom: 10px;">Título da vaga: ${titulo}</h2>
          <p style="font-size: 16px; margin-bottom: 18px; color:#ffffff; max-width: 650px; margin: 0 auto 18px;">${mensagemEmail}</p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 14px; margin-bottom: 10px; color:#111111">Atenciosamente, Carreiras.</p>
          <p style="font-size: 12px; margin-bottom: 20px;"><a href="https://www.carreiras.com.br" target="_blank" style="color: #333;">www.carreiras.com.br</a></p>
        </div>
      </div>
    </div>
  `;

    Vaga.vagaUpdateStatus(id_vaga, id_empresa, opcaoSelecionada, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });

        if (result) {
            async function main() {
                const info = await transporter.sendMail({
                    from: '"Carreiras" <carreirassenai@gmail.com>',
                    to: email,
                    subject: "Aprovação de Vaga",
                    html: corpo
                });

                console.log("Email de validação de conta enviado para:", info.accepted);
            }
            main().catch(console.error);
            
            return res.status(200).json({ success: true, result: result });
        }
    })
}

// No controlador Vaga
exports.vagasInscritas = (req, res) => {
    const idCandidato = req.session.usuario.id;

    Vaga.vagasInscritasPorCandidato(idCandidato, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ success: 'Vagas inscritas:', result: result });
        }
    });
};