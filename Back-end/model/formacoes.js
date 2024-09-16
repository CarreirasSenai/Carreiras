const db = require("../config/db");

exports.formacaoCreate = (id, { dados }, callback) => {
    const { nivel, formacao, unidade, inicio, fim } = dados;

    db.query('insert into formacao (nome, nivel, lugar, inicio, termino, id_candidato) value (?, ?, ?, ?, ?, ?)',
        [formacao, nivel, unidade, inicio, fim, id], (err, result) => {
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
            console.log(err.message);
            return callback(err.message, null);
        } else if (result) {
            // console.log(result);
            return callback(null, result);
        }
    });
}

exports.formacaoDelete = (id, callback) => {
    db.query('delete from formacao where id = ?', [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(err.message, null);
        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};

exports.formacaoUpdate = (dados, callback) => {
    const nome = dados.formacao;
    const nivel = dados.nivel;
    const lugar = dados.unidade;
    const inicio = dados.inicio;
    const termino = dados.fim;
    const id = dados.id;

    db.query('update formacao set nome = ?, nivel = ?, lugar = ?, inicio = ?, termino = ? where id = ?', [nome, nivel, lugar, inicio, termino, id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else if (result) {
            // console.log(result);
            return callback(null, result.affectedRows > 0);
        }
    });
}