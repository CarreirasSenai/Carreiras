const Formacao = require('../model/formacoes');
const DataHora = require('../services/dataHora');

exports.formacaoCreate = (req, res) => {
    // const id = req.session.usuario.id;
    const id = 10;
    const dados = req.body;
    const dataAtu = DataHora.dataHora();

    Formacao.formacaoCreate(id, dados, dataAtu, (err, insertId) => {

    });
}