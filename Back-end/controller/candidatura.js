const Candidatura = require("../model/candidatura");

exports.create = (req, res) => {
    const idCandidato = req.session.usuario.id;
    const idVaga = req.body.idVaga;
    const dados = req.body;
    // const idCandidato = 25;

    Candidatura.create(idCandidato, idVaga, dados, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        } else if (result) {
            return res.json({ success: true, result: 'Candidatura enviada!' })
        }
    });
}

exports.read = (req, res) => {
    const idCandidato = req.session.usuario.id;
    const idVaga = req.query.idVaga;
    // const idCandidato = 25;

    Candidatura.read(idCandidato, idVaga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.json({ success: 'Candidatura:', result: result });
        }
    });
};

exports.readVaga = (req, res) => {
    const idVaga = req.query.idVaga;

    Candidatura.readVaga(idVaga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.json({ success: 'Candidaturas:', result: result });
        }
    });
};

exports.delete = (req, res) => {
    const idCandidato = req.session.usuario.id;
    const idVaga = req.params.idVaga;
    // const idCandidato = 25;

    Candidatura.delete(idCandidato, idVaga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
};

exports.update = (req, res) => {
    const idCandidato = req.body.idCandidato;
    const idVaga = req.body.idVaga;
    const justificativa = req.body.justificativa;
    const status = req.body.status;

    const selecao = justificativa ? 0 : status;

    console.log(idCandidato);
    console.log(req.body);

    Candidatura.update(idCandidato, idVaga, selecao, justificativa, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        } else if (result) {
            console.log(result);
            return res.json({ success: true, result: 'Candidatura atualizada!' })
        }
    });
}

exports.justificaGeral = (req, res) => {
    const candidatos = req.body.candidatos;
    const idVaga = req.body.idVaga;
    const justificativa = req.body.justificativa;

    Candidatura.justificaGeral(candidatos, idVaga, justificativa, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        } else if (result) {
            console.log(result);
            return res.json({ success: true, result: 'Candidatura finalizada!' })
        }
    });
}