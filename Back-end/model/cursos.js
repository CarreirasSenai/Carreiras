const db = require("../config/db");

exports.cursoCreate = (id, { dados }, dataAtu, callback) => {
    const { formacao, unidade, inicio, fim } = dados;

    db.query('insert into curso (nome, lugar, inicio, termino, id_candidato, data_atu) value (?, ?, ?, ?, ?, ?)',
        [formacao, unidade, inicio, fim, id, dataAtu], (err, result) => {
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

exports.cursoRead = (id, callback) => {
    db.query('select * from curso where id_candidato = ?', [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(null, err.message);
        } else if (result) {
            // console.log(result);
            return callback(null, result);
        }
    });
}

exports.cursoDelete = (id, callback) => {
    db.query('delete from curso where id = ?', [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(null, err.message);
        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};

exports.cursoUpdate = (dados, dataAtu, callback) => {
    const nome = dados.formacao;
    const lugar = dados.unidade;
    const inicio = dados.inicio;
    const termino = dados.fim;
    const id = dados.id;

    db.query('update curso set nome = ?, lugar = ?, inicio = ?, termino = ?, data_atu = ? where id = ?', [nome, lugar, inicio, termino, dataAtu, id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else if (result) {
            // console.log(result);
            return callback(null, result.affectedRows > 0);
        }
    });
}