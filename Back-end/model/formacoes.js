const db = require("../config/db");

exports.formacaoCreate = (id, { dados }, dataAtu, callback) => {
    const { nivel, formacao, unidade, inicio, fim } = dados;

    db.query('insert into formacao (nome, nivel, lugar, inicio, termino, id_candidato, data_atu) value (?, ?, ?, ?, ?, ?, ?)',
        [nivel, formacao, unidade, inicio, fim, id, dataAtu], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);

            } else if (result) {
                console.log(result);
                return callback(null, result.insertId);
            }

        }
    );
}

exports.formacaoRead = (id, callback) => {
    db.query('select * from formacao where id_candidato = ?', [id], (err, result) => {
        if (err) {
            // console.log(err.message);
            return callback(null, err.message);
        } else if (result) {
            // console.log(result);
            return callback(null, result);
        }
    });
}