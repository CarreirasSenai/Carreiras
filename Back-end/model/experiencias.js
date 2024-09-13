const db = require("../config/db")

exports.experienciaRead = (id, callback) => {
    db.query('select * from experiencia where id_candidato = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);

        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};

exports.experienciaCreate = (id, { dados }, callback) => {
    const { cargo, empresa, contrato, atividades, inicio, fim } = dados;

    db.query('insert into experiencia (cargo, empresa, contrato, atividades, inicio, termino, id_candidato) value (?, ?, ?, ?, ?, ?, ?)',
        [cargo, empresa, contrato, JSON.stringify(atividades), inicio, fim, id], (err, result) => {
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

exports.experienciaDelete = (id, callback) => {
    db.query('delete from experiencia where id = ?', [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(null, err.message);
        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};