const Candidatura = require("../model/candidatura");

exports.create = (req, res) => {
    const idCandidato = req.session.usuario.id;
    // const idCandidato = 25;
    const idVaga = req.body.idVaga;
    const dados = req.body;

    Candidatura.create(idCandidato, idVaga, dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.json({ success: true, result: 'Candidatura enviada!' })
        }
    });
}

exports.read = (req, res) => {
    const idCandidato = req.session.usuario.id;
    // const idCandidato = 25;
    const idVaga = req.query.idVaga;    

    Candidatura.read(idCandidato, idVaga, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.json({ success: 'Candidatura:', result: result });
        }
    });
}