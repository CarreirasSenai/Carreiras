const Curso = require('../model/cursos');
const DataHora = require('../services/dataHora');

exports.cursoCreate = (req, res) => {
    const id = req.session.usuario.id;
    const dados = req.body;
    const dataAtu = DataHora.dataHora();

    Curso.cursoCreate(id, dados, dataAtu, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Curso Criado!' });
        }
    });
}

exports.cursoRead = (req, res) => {
    const id = req.session.usuario.id;

    Curso.cursoRead(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
}

exports.cursoDelete = (req, res) => {
    const { id } = req.params;

    Curso.cursoDelete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!result) {
            return res.status(404).json({ error: "Recurso não encontrado" });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
};

exports.cursoUpdate = (req, res) => {
    const { dados } = req.body;
    const dataAtu = DataHora.dataHora();

    Curso.cursoUpdate(dados, dataAtu, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Curso Atualizado!' });
        }
    });
}
