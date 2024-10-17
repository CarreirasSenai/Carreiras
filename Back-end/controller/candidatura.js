const Candidatura = require("../model/candidatura");

exports.create = (req, res) => {
    const id = 25;
    const dados = req.body;

    Candidatura.create(id, dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.json({ success: true, result: 'Candidatura enviada!' })
        }
    });
}