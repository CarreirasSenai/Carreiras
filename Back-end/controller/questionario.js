const Questionario = require("../model/questionario");

exports.create = (req, res) => {
    const { dados } = req.body;

    Questionario.create(dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ success: true, result: result });
        }
    });
};

exports.read = (req, res) => {
    const { id } = req.query;

    Questionario.read(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Questionário:', result: result });
        }
    });
}

exports.readResposta = (req, res) => {
    const { idVaga, idCandidato } = req.query;

    Questionario.readResposta(idVaga, idCandidato, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'Respostas:', result: result });
        }
    });
}

exports.update = (req, res) => {
    const dados = req.body;

    Questionario.update(dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.json({ sucess: true, result: result });
        }
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Questionario.delete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.json({ sucess: true, result: 'Pergunta deletada!' });
        }
    });
};