const Vaga = require("../model/vaga");

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