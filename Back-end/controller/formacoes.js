const Formacao = require('../model/formacoes');
const DataHora = require('../services/dataHora');

exports.formacaoCreate = (req, res) => {
    // const id = req.session.usuario.id;
    const id = 10;
    const dados = req.body;
    const dataAtu = DataHora.dataHora();

    Formacao.formacaoCreate(id, dados, dataAtu, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Formação Criada!' });
        }
    });
}

exports.formacaoRead = (req, res) => {
    const id = 10;

    Formacao.formacaoRead(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {         
            return res.status(200).json({ sucess: true, result: result });
        }
    });
}  