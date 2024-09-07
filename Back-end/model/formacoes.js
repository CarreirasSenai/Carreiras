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