const db = require("../config/db");

exports.habilidadeCreate = (id, { dados }, callback) => {
    const { habilidades } = dados;

    db.query('insert into habilidade (habilidades, id_candidato) value (?, ?)', [JSON.stringify(habilidades), id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);

        } else if (result) {
            console.log(result);
            return callback(null, result.insertId);
        }
    });
}

exports.habilidadeRead = (id, callback) => {
    db.query('select * from habilidade where id_candidato = ?', [id], (err, rows) => {
        if (err) {
            console.log(err.message);
            return callback(null, err.message);

        } else if (rows.length > 0) {
            console.log(rows[0]);
            return callback(null, rows[0]);
        }
    });
}

exports.habilidadeDelete = (id, callback) => {
    db.query('delete from habilidade where id = ?', [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(null, err.message);

        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};

exports.habilidadeUpdate = (dados, callback) => {
    const { id, habilidades } = dados;

    db.query('update habilidade set habilidades = ? where id = ?', [JSON.stringify(habilidades), id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else if (result) {
            console.log(result);
            return callback(null, result.affectedRows > 0);
        }
    });
}