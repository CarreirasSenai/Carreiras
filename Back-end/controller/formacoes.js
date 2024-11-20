const Formacao = require('../model/formacoes');

exports.formacaoCreate = (req, res) => {
    const id = req.session.usuario.id;
    const dados = req.body;

    Formacao.formacaoCreate(id, dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Formação Criada!' });
        }
    });
}

exports.formacaoRead = (req, res) => {
    const idReq = req.query.id;
    const idSession = req.session.usuario.id;

    const id = idReq ? idReq : idSession;
    
    Formacao.formacaoRead(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
}

exports.formacaoDelete = (req, res) => {
    const { id } = req.params;

    Formacao.formacaoDelete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!result) {
            return res.status(404).json({ error: "Recurso não encontrado" });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
};

exports.formacaoUpdate = (req, res) => {
    const { dados } = req.body;

    Formacao.formacaoUpdate(dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Formação Atualizada!' });
        }
    });
}
