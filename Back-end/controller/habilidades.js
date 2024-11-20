const Habilidade = require('../model/habilidades');

exports.habilidadeCreate = (req, res) => {
    const id = req.session.usuario.id;
    const dados = req.body;

    Habilidade.habilidadeCreate(id, dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Habilidade Criada!' });
        }
    });
}

exports.habilidadeRead = (req, res) => {
    const idReq = req.query.id;
    const idSession = req.session.usuario.id;

    const id = idReq ? idReq : idSession;

    Habilidade.habilidadeRead(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
}

exports.habilidadeDelete = (req, res) => {
    const { id } = req.params; // Este é o id da habilidade e não do user logado

    Habilidade.habilidadeDelete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!result) {
            return res.status(404).json({ error: "Recurso não encontrado" });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
};

exports.habilidadeUpdate = (req, res) => {
    const { dados } = req.body;
    console.log(dados);

    Habilidade.habilidadeUpdate(dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Habilidade Atualizada!' });
        }
    });
}
