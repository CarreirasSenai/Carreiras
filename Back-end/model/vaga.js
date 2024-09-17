const db = require("../config/db");

exports.vagaCreate = (id, { dados }, callback) => {
    const { titulo, cep, cidade, estado, contrato, modalidade, nivel, remuneracao, habsExigidas, habsOpcionais, descricao, etapas, questionario } = dados;

    db.query('insert into vagas (titulo, cep, cidade, estado, contrato, modalidade, nivel, remuneracao, habilidades_exigidas, habilidades_opcionais, descricao, etapas, questionario, id_empresa) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [titulo, cep, cidade, estado, contrato, modalidade, nivel, remuneracao, JSON.stringify(habsExigidas), JSON.stringify(habsOpcionais), descricao, JSON.stringify(etapas), JSON.stringify(questionario), id],
        (err, result) => {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                console.log(result);
                return callback(null, result.insertId);
            }
        });
};

exports.vagaRead = (id, callback) => {
    db.query('select * from vagas where id_empresa = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);

        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};