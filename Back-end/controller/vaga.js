const Vaga = require("../model/vaga");

exports.buscarVaga = (req, res) => {
    // const { pesquisa } = req.body;
    const pesquisa = 'Analista de Sistemas';
    console.log(pesquisa);
    res.json({ sucess: true, pesquisa: pesquisa });
};

exports.vagaCreate = (req, res) => {
    // const id = req.session.usuario.id;
    const id = 1;
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
    // const id = req.session.usuario.id;
    const id = 1;

    Vaga.vagaRead(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Vagas empresa:', result: result });
        }
    });
}