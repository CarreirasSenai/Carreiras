const db = require("../config/db");

exports.create = (idCandidato, idVaga, { dados }, callback) => {
    const respostas = dados;

    db.query('insert into candidatura (id_candidato, id_vaga) values (?, ?)', [idCandidato, idVaga], (err, result) => {
        if (err) {
            return callback(err.message, null);
        }

        if (!Object.keys(respostas).length) {
            return callback(null, result);
        }

        const promises = Object.keys(respostas).map((key) => {
            const idQuestionario = key.match(/\d+$/)[0];

            return new Promise((resolve, reject) => {
                db.query('insert into questionario_respostas (resposta, id_questionario, id_candidato) values (?, ?, ?)',
                    [respostas[key], idQuestionario, idCandidato], (err, result) => {
                        if (err) {
                            reject(err.message);
                        } else {
                            resolve(result);
                        }
                    });
            });
        });

        Promise.all(promises)
            .then(results => {
                callback(null, results);
            })
            .catch(err => {
                callback(err, null);
            });
    });
};


exports.read = (idCandidato, idVaga, callback) => {
    db.query('select * from carreiras.candidatura where id_candidato = ? and id_vaga = ?', [idCandidato, idVaga], (err, result) => {
        if (err) {
            console.error(err.message);
            return callback(err.message, null);
        }

        if (result.length === 0) {
            return callback('Nenhum resultado encontrado', null);
        }

        console.log(result);
        return callback(null, result[0]);
    });
};
