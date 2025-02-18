const Experiencia = require("../model/experiencias")

exports.experienciaRead = (req, res) => {
    const idReq = req.query.id;
    const idSession = req.session.usuario.id;

    const id = idReq ? idReq : idSession;

    Experiencia.experienciaRead(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else if (result) {
            return res.json({ succes: true, result: result });
        }
    });
};

exports.experienciaCreate = (req, res) => {
    const id = req.session.usuario.id;
    // const id = 1;
    const dados = req.body;

    Experiencia.experienciaCreate(id, dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Experiência Criada!' });
        }
    });
}

exports.experienciaDelete = (req, res) => {
    const { id } = req.params;

    Experiencia.experienciaDelete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!result) {
            return res.status(404).json({ error: "Recurso não encontrado" });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
};

exports.experienciaUpdate = (req, res) => {
    const dados = req.body;

    Experiencia.experienciaUpdate(dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else if (result) {
            return res.json({ succes: true, result: 'Experiência Atualizada!' });
        }
    });
};